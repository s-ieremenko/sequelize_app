import * as express from 'express';
import { Router } from 'express';
import { UserController } from './user.controller';

const userRouter: Router = express.Router();

userRouter.get('/', UserController.read);
userRouter.post('/post', UserController.create);
userRouter.patch('/patch', UserController.update);

export default userRouter;
