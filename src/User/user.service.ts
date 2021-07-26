import User from './user.model';
import { v4 as uuidv4 } from 'uuid';
import Role from '../Role/role.model';

export const getUsers = async (): Promise<User[]> => {
  const users = await User.findAll();
  if (!users.length) {
    throw new Error('No users were found');
  }
  return users;
};

export const createUser = async (
  name: string,
  email: string
): Promise<void> => {
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
export const addRoleForUser = async (
  userUuid: string,
  roleUuid: string
): Promise<void> => {
  let user: User = await User.findByPk(userUuid);
  let role: Role = await Role.findByPk(roleUuid);
  if (!user || !role) {
    throw new Error('User or role not found');
  }
  user.$set('role', role);
};
