import { Model, ModelCtor, Sequelize } from 'sequelize-typescript';
import { Dialect } from 'sequelize/types';
import Permission from '../Permission/permission.model';
import Role from '../Role/role.model';
import User from '../User/user.model';
import PermissionRole from './permission_role.model';

const db: string = 'users';
const dbLogin: string = 'root';
const dbPassword: string = '12345678';
const dbDialect: Dialect = 'mysql';
const dbHost: string = 'localhost';
const pathToModels: ModelCtor[] = [User, Role, Permission, PermissionRole];

export const ok: number = 200;
export const notFound: number = 404;
export const badRequest: number = 400;

export const sequelize: Sequelize = new Sequelize(db, dbLogin, dbPassword, {
  dialect: dbDialect,
  host: dbHost,
  models: pathToModels,
});
export const port: number = 3000;
