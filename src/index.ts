import { createConnection } from "typeorm";
import * as express from "express";
import { Request, Response, NextFunction } from "express";
import * as bodyParser from "body-parser";
import helmet from "helmet";
import * as cors from "cors";
import routes from "./routes/index";
import limiter from './middlewares/rateLimiter';


// Cria a conexão com o banco de dados
createConnection()
  .then(async connection => {
    // Cria uma nova instância da API Express
    const app = express();
    
    // Utiliza do middleware de limite de requisições
    app.use(limiter);

    app.use(cors());
    app.use(helmet());

    // app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());

    // Seta as rotas da API
    app.use("/", routes);

    app.use((err: Error, request: Request, response: Response, _: NextFunction) => {    
      return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
      });
    });

    app.listen(3000, () => {
      console.log("Server started on port 3000!");
    });
  })
  .catch(error => console.log(error));