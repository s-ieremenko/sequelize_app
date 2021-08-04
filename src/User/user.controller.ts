import { Request, Response } from 'express';
import { badRequest, notFound, ok } from '../common/constants';
import { UserAttributes } from './user.interfaces';
import User from './user.model';
import {
  addRoleForUser,
  createUser,
  getUser,
  getUsers,
  isAdmin,
} from './user.service';

export class UserController {
  static async read(request: Request, response: Response): Promise<void> {
    try {
      const users: User[] = await getUsers();
      response.status(ok).send(users);
    } catch (error: any) {
      response.status(notFound).send(error.message);
    }
  }

  static async readUser(request: Request, response: Response): Promise<void> {
    const uuid = request.params.uuid;
    if (!uuid) {
      response.status(badRequest).send('User uuid required');
    }
    try {
      const user: User = await getUser(uuid);
      const admin: boolean = await isAdmin(user);
      if (admin) {
        response.status(ok).send('Admin');
      } else {
        response.status(403).send('Not admin');
      }
    } catch (error: any) {
      response.status(notFound).send(error.message);
    }
  }

  static async create(request: Request, response: Response): Promise<void> {
    const { name, email }: UserAttributes = request.body;
    if (!name || !email) {
      response.status(badRequest).send('Fields "name" or "email" required');
    }
    try {
      await createUser(name, email);
      response.status(ok).send('User is created');
    } catch (error: any) {
      response.status(badRequest).send(error.message);
    }
  }
  static async update(request: Request, response: Response): Promise<void> {
    const { userUuid, roleUuid }: { userUuid: string; roleUuid: string } =
      request.body;
    if (!userUuid || !roleUuid) {
      response
        .status(badRequest)
        .send('Fields "userUuid" or "roleUuid" required');
    }
    try {
      await addRoleForUser(userUuid, roleUuid);
      response.status(ok).send('Role is created');
    } catch (error: any) {
      response.status(badRequest).send(error.message);
    }
  }
}

export default UserController;
