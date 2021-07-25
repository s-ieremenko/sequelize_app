import express, { Express } from 'express';
import { v4 as uuidv4 } from 'uuid';

import User from './models/user.model';
import Role from './models/role.model';
import Permission from './models/permission.model';
import { port, sequelize } from './constants';
import PERMISSIONS from './enums';

const app: Express = express();

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
  sequelize
    .authenticate()
    .then(async () => {
      try {
        await sequelize.sync({ force: true });

        const permissionCreate = await Permission.create({
          uuid: uuidv4(),
          name: PERMISSIONS.CREATE,
        });
        const permissionRead = await Permission.create({
          uuid: uuidv4(),
          name: PERMISSIONS.READ,
        });
        const permissionUpdate = await Permission.create({
          uuid: uuidv4(),
          name: PERMISSIONS.UPDATE,
        });
        const permissionDelete = await Permission.create({
          uuid: uuidv4(),
          name: PERMISSIONS.DELETE,
        });

        const roleAdmin = await Role.create({ uuid: uuidv4(), name: 'Admin' });
        const roleModerator = await Role.create({
          uuid: uuidv4(),
          name: 'Moderator',
        });
        const roleUser = await Role.create({ uuid: uuidv4(), name: 'User' });

        const user1 = await User.create({
          uuid: uuidv4(),
          name: 'Max',
          email: 'max@mail.com',
        });
        const user2 = await User.create({
          uuid: uuidv4(),
          name: 'Vasya',
          email: 'vasya@mail.com',
        });
        const user3 = await User.create({
          uuid: uuidv4(),
          name: 'Alex',
          email: 'alex@mail.com',
        });
        const user4 = await User.create({
          uuid: uuidv4(),
          name: 'Petya',
          email: 'petya@mail.com',
        });

        await roleAdmin.$add('permissions', [
          permissionCreate,
          permissionRead,
          permissionDelete,
          permissionUpdate,
        ]);
        await roleModerator.$add('permissions', [
          permissionCreate,
          permissionUpdate,
        ]);
        await roleUser.$add('permissions', [permissionRead]);

        await roleAdmin.$add('users', [user1]);
        await roleModerator.$add('users', [user2]);
        await roleUser.$add('users', [user3, user4]);
      } catch (error: any) {
        console.log(error.message);
      }
    })
    .catch((error: any) => console.log(error.message));
});
