import { Sequelize } from 'sequelize-typescript';
import express, { Express } from 'express';

const db = 'users';
const dbLogin = 'root';
const dbPassword = '12345678';
const dbDialect = 'mysql';
const dbHost = 'localhost';
const pathToModels = [__dirname + '/models'];

export const sequelize: Sequelize = new Sequelize(db, dbLogin, dbPassword, {
  dialect: dbDialect,
  host: dbHost,
  models: pathToModels,
});
export const app: Express = express();
export const port: number = 3000;
