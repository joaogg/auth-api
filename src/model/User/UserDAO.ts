import { EntityRepository, Repository } from 'typeorm';
import { getRepository } from "typeorm";
import User from '../../entity/User';

@EntityRepository(User)
class UserDAO extends Repository<User> {

    public async findByName(name: string): Promise<User | undefined> {
        const user = await this.findOne({
            where: {
                name,
            },
        });

        return user;
    }

    public static async findById(id: string): Promise<User | undefined> {
        try {
            const user = await getRepository(User).findOne({
                select: ["id", "username", "role"],
                where: {
                    id,
                },
            });

            return user;
        } catch (error) {
            return undefined;
        }
    }


    public static async findAll(): Promise<User | User[] | undefined> {
        try {
            const user = await getRepository(User).find({
                select: ["id", "username", "role"]
            });

            return user;
        } catch (error) {
            return undefined;
        }
    }

    public static async create(user: User): Promise<User | User[] | undefined> {
        try {
            const createUser = await getRepository(User).save(user);

            return createUser;
        } catch (error) {
            return undefined;
        }
    }

    public static async update(user: User): Promise<User | User[] | undefined> {
        try {
            const updateUser = await getRepository(User).save(user);

              console.log('updateUser = ', updateUser)

            return [];
        } catch (error) {
            return undefined;
        }
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.findOne({
            where: {
                email,
            },
        });

        return user;
    }
}

export default UserDAO;