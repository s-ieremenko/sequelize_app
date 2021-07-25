import { Request, Response } from 'express';
import { badRequest, notFound, ok } from '../common/constants';
import Role from './role.model';
import {
  addPermissionToRole,
  createRoleWithPermissions,
  getRolesWithPermissions,
} from './role.service';

export class RoleController {
  static async read(request: Request, response: Response): Promise<void> {
    try {
      const roles: Role[] = await getRolesWithPermissions();
      response.status(ok).send(roles);
    } catch (error: any) {
      response.status(notFound).send(error.message);
    }
  }

  static async create(request: Request, response: Response): Promise<void> {
    if (!request.body.name || !request.body.permissionUuids) {
      response
        .status(badRequest)
        .send('Fields "name" and "permissionUuids required"');
    }
    try {
      await createRoleWithPermissions(request);

      response.status(ok).send('Role is created');
    } catch (error: any) {
      response.status(badRequest).send(error.message);
    }
  }
  static async update(request: Request, response: Response): Promise<void> {
    if (!request.body.roleUuid || !request.body.permissionUuid) {
      response.status(badRequest).send('Bad request');
    }
    try {
      await addPermissionToRole(request);

      response.status(ok).send('ok');
    } catch (error: any) {
      console.log(error.message);
      response.status(badRequest).send(error.message);
    }
  }
}
export default RoleController;
