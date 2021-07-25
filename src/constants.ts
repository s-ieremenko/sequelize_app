import { Sequelize } from 'sequelize-typescript';

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
export const port: number = 3000;
