import express, { Express } from 'express';

import userRouter from './user/user.route';
import permissionRouter from './permission/permission.route';
import roleRouter from './role/role.route';
import { port } from './common/constants';
import { sequelize } from './common/sequelize';

const app: Express = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/user', userRouter);
app.use('/role', roleRouter);
app.use('/permission', permissionRouter);

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
  sequelize
    .authenticate()
    .then(async () => {
      try {
        await sequelize.sync({ force: false });
      } catch (error: any) {
        console.log(error.message);
      }
    })
    .catch((error: any) => console.log(error.message));
});
