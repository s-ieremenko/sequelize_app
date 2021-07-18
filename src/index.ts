import { IsUUID, Sequelize } from 'sequelize-typescript';
import express, { Express } from 'express';
import User from './models/user.model';
import Role from './models/role.model';
import Permission, { PERMISSIONS } from './models/permission.model';
import { v4 as uuidv4 } from 'uuid';
import PermissionRole from './models/permission_role.model';
import {
  port,
  app,
  sequelize,
  permissionCreate,
  permissionRead,
  permissionUpdate,
  permissionDelete,
  roleAdmin,
  roleModerator,
  roleUser,
} from './constants';

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
  sequelize
    .authenticate()
    .then(async () => {
      try {
        await sequelize.sync({ force: true });

        await Permission.create({
          uuid: permissionCreate,
          name: PERMISSIONS.CREATE,
        });
        await Permission.create({
          uuid: permissionRead,
          name: PERMISSIONS.READ,
        });
        await Permission.create({
          uuid: permissionUpdate,
          name: PERMISSIONS.UPDATE,
        });
        await Permission.create({
          uuid: permissionDelete,
          name: PERMISSIONS.DELETE,
        });
        await Role.create({ uuid: roleAdmin, name: 'Admin' });
        await Role.create({ uuid: roleModerator, name: 'Moderator' });
        await Role.create({ uuid: roleUser, name: 'User' });
        await PermissionRole.create({
          roleId: roleAdmin,
          permissionId: permissionCreate,
        });
        await PermissionRole.create({
          roleId: roleAdmin,
          permissionId: permissionRead,
        });
        await PermissionRole.create({
          roleId: roleAdmin,
          permissionId: permissionUpdate,
        });
        await PermissionRole.create({
          roleId: roleAdmin,
          permissionId: permissionDelete,
        });

        await PermissionRole.create({
          roleId: roleModerator,
          permissionId: permissionUpdate,
        });
        await PermissionRole.create({
          roleId: roleModerator,
          permissionId: permissionCreate,
        });

        await PermissionRole.create({
          roleId: roleUser,
          permissionId: permissionRead,
        });

        await User.create({
          uuid: uuidv4(),
          name: 'Max',
          email: 'max@mail.com',
          roleId: roleAdmin,
        });
        await User.create({
          uuid: uuidv4(),
          name: 'Vasya',
          email: 'vasya@mail.com',
          roleId: roleUser,
        });
        await User.create({
          uuid: uuidv4(),
          name: 'Alex',
          email: 'alex@mail.com',
          roleId: roleModerator,
        });
        await User.create({
          uuid: uuidv4(),
          name: 'Petya',
          email: 'petya@mail.com',
          roleId: roleUser,
        });
      } catch (error: any) {
        console.log(error.message);
      }
    })
    .catch((error: any) => console.log(error.message));
});
