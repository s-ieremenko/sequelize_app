import express, { Request, Response } from 'express';
import { badRequest, notFound, ok } from '../common/constants';
import User from './user.model';
import { addRoleForUser, createUser, getUsers } from './user.service';

export class UserController {
  static async read(request: Request, response: Response): Promise<void> {
    try {
      const users: User[] = await getUsers();
      response.status(ok).send(users);
    } catch (error: any) {
      response.status(notFound).send(error.message);
    }
  }

  static async create(request: Request, response: Response): Promise<void> {
    if (!request.body.name || !request.body.email) {
      response.status(badRequest).send('Fields "name" or "email" required');
    }
    try {
      await createUser(request);
      response.status(ok).send('User is created');
    } catch (error: any) {
      console.log(error.message);
      response.status(badRequest).send(error.message);
    }
  }
  static async update(request: Request, response: Response): Promise<void> {
    if (!request.body.userUuid || !request.body.roleUuid) {
      response
        .status(badRequest)
        .send('Fields "userUuid" or "roleUuid" required');
    }
    try {
      await addRoleForUser(request);
      response.status(ok).send('Role is created');
    } catch (error: any) {
      console.log(error.message);
      response.status(badRequest).send(error.message);
    }
  }
}
export default UserController;
