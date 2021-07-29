import { ModelCtor } from 'sequelize-typescript';
import { Dialect } from 'sequelize/types';
import Permission from '../permission/permission.model';
import Role from '../role/role.model';
import User from '../user/user.model';
import PermissionRole from './permission_role.model';

const db: string = 'users';
const dbLogin: string = 'root';
const dbPassword: string = '12345678';
const dbDialect: Dialect = 'mysql';
const dbHost: string = 'localhost';
const pathToModels: ModelCtor[] = [User, Role, Permission, PermissionRole];

const port: number = 3000;
const ok: number = 200;
const notFound: number = 404;
const badRequest: number = 400;

export {
  db,
  dbLogin,
  dbPassword,
  dbDialect,
  dbHost,
  pathToModels,
  port,
  ok,
  notFound,
  badRequest,
};
