import 'reflect-metadata';
import 'dotenv/config';

import mongoose from 'mongoose';
import faker from 'faker';

import * as swaggerDocument from '../swagger.json';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';

import User from './models/User';
import routes from './routes';
import AppError from './errors/AppError';

import CreateUserService from './services/CreateUserService';

const app = express();
app.use(cors());
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use(routes);

mongoose.connect(process.env.MONGO_URL || 'localhost', {
  useNewUrlParser: true,
  useUnifiedTopology: false,
  useCreateIndex: true,
  useFindAndModify: false,
});

// criar usuarios, caso ainda não exista
const generateUsers = async () => {
  const minimo = 117;
  try {
    const users = await User.find();
    if (users.length < minimo) {
      const restante = minimo - users.length;
      let i = 1;
      const logins: string[] = [];
      const createUser = new CreateUserService();

      while (i <= restante) {
        logins.push(faker.name.firstName());
        i += 1;
      }

      for (const login of logins) {
        await createUser.execute({ login, verificacao: false });
      }

      console.log(`Adicionado ${restante} novos usuários`);
    } else {
      console.log(`O sistema já possui ${minimo} de usuarios`);
    }
  } catch (err) {
    console.log(err);
  }
};

generateUsers();

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

export default app;
