import * as express from 'express';
import { Router } from 'express';
import { RoleController } from './role.controller';

const roleRouter: Router = express.Router();

roleRouter.get('/', RoleController.read);
roleRouter.post('/post', RoleController.create);
roleRouter.patch('/patch', RoleController.update);

export default roleRouter;
