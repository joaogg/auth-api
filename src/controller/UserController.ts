import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import User from "../entity/User";
import AppError from "../error/AppError";

import UserDAO from '../model/User/UserDAO';


class UserController {

  static getAll = async (req: Request, res: Response) => {

    // Procura os dados na tabela User
    const users = await UserDAO.findAll();

    if (!users) {
      const err = new AppError('Ocorreu um erro ao consultar os usuários. Por favor tente novamente mais tarde!');

      return res
        .status(400)
        .send(err);
    }

    // Envia os dados e o status da API REST
    return res
      .status(200)
      .send(users);
  };

  static getOneById = async (req: Request, res: Response) => {
    // Pega o id na requisição
    const userId: string = req.params.id;

    // Procura os dados na tabela User
    const users = await UserDAO.findById(userId);

    if (!users) {
      const err = new AppError('Ocorreu um erro ao consultar este usuário. Por favor tente novamente mais tarde!');

      return res
        .status(400)
        .send(err);
    }

    // Envia os dados e o status da API REST
    return res
      .status(200)
      .send(users);
  };

  static createUser = async (req: Request, res: Response) => {
    // Parâmetros no corpo da requisição
    let { username, password, role } = req.body;

    let user = new User();

    user.username = username;
    user.password = password;
    user.role = role;

    // Validando os parâmetros
    const errors = await validate(user);

    if (errors.length > 0) {
      return res
        .status(400)
        .send(errors);
    }

    // Faz a senha do usuário
    user.hashPassword();

    // Procura os dados na tabela User
    const users = await UserDAO.create(user);

    if (!users) {
      const err = new AppError('Ocorreu um erro ao criar o usuário. Por favor tente novamente mais tarde!');

      return res
        .status(400)
        .send(err);
    }

    // Usuário criado
    return res
      .status(201)
      .send("Usuário criado!");
  };

  static editUser = async (req: Request, res: Response) => {
    // Parâmetros no corpo da requisição
    const userId = req.params.id;

    const { username, role } = req.body;

    // Procura os dados na tabela User
    const user = await UserDAO.findById(userId);
    

    if (!user) {
      const err = new AppError('Ocorreu um erro ao consultar este usuário. Por favor tente novamente mais tarde!');

      return res
        .status(400)
        .send(err);
    }


    user.username = username;
    user.role = role;

    // Procura os dados na tabela User
    const users = await UserDAO.update(user);

    if (!users) {
      const err = new AppError('Ocorreu um erro ao atualizar o usuário. Por favor tente novamente mais tarde!');

      return res
        .status(400)
        .send(err);
    }

    // Usuário criado
    return res
      .status(201)
      .send("Usuário atualizado!");

  };

  static deleteUser = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;

    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send("User not found");
      return;
    }
    userRepository.delete(id);

    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
  };
};

export default UserController;