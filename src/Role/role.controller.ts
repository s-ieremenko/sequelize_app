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
    const {
      name,
      permissionUuids,
    }: { name: string; permissionUuids: string[] } = request.body;
    if (!name || !permissionUuids) {
      response
        .status(badRequest)
        .send('Fields "name" and "permissionUuids required"');
    }
    try {
      await createRoleWithPermissions(name, permissionUuids);
      response.status(ok).send('Role is created');
    } catch (error: any) {
      response.status(badRequest).send(error.message);
    }
  }

  static async update(request: Request, response: Response): Promise<void> {
    const { permissionUuid, roleUuid } = request.body;
    if (!roleUuid || !permissionUuid) {
      response
        .status(badRequest)
        .send('Fields "roleUuid" and "permissionUuid" required');
    }
    try {
      await addPermissionToRole(permissionUuid, roleUuid);
      response.status(ok).send('Permission added');
    } catch (error: any) {
      response.status(badRequest).send(error.message);
    }
  }
}

export default RoleController;
