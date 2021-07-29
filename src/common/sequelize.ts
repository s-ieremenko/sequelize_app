import { Sequelize } from 'sequelize-typescript';
import {
  db,
  dbLogin,
  dbPassword,
  dbDialect,
  dbHost,
  pathToModels,
} from './constants';

export const sequelize: Sequelize = new Sequelize(db, dbLogin, dbPassword, {
  dialect: dbDialect,
  host: dbHost,
  models: pathToModels,
});
