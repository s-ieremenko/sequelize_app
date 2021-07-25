import { Request } from 'express';
import User from './user.model';
import { v4 as uuidv4 } from 'uuid';
import Role from '../Role/role.model';
import { UserAttributes } from './user.interfaces';

export const getUsers = async (): Promise<User[]> => {
  const users = await User.findAll();
  if (!users.length) {
    throw new Error('No users were found');
  }
  return users;
};

export const createUser = async (request: Request): Promise<void> => {
  const { name, email }: UserAttributes = request.body;
  let userExist: User = await User.findOne({
    where: {
      email,
    },
  });
  if (userExist) {
    throw new Error('User already exists');
  }
  await User.create({
    uuid: uuidv4(),
    name,
    email,
  });
};
export const addRoleForUser = async (request: Request): Promise<void> => {
  const { userUuid, roleUuid }: { userUuid: string; roleUuid: string } =
    request.body;
  let user: User = await User.findByPk(userUuid);
  let role: Role = await Role.findByPk(roleUuid);

  if (!user || !role) {
    throw new Error('User or role not found');
  }
  user.$set('role', role);
};
