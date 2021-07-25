import express, { Express } from 'express';
import userRouter from './User/user.route';
import permissionRouter from './Permission/permission.route';
import roleRouter from './Role/role.route';
import { port, sequelize } from './common/constants';

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
