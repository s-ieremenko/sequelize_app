import * as express from 'express';
import { Router } from 'express';
import { PermissionController } from './permission.controller';

const permissionRouter: Router = express.Router();

permissionRouter.get('/', PermissionController.read);
permissionRouter.post('/post', PermissionController.create);
permissionRouter.delete('/delete', PermissionController.delete);

export default permissionRouter;
