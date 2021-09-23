import User from './user.model';
import { v4 as uuidv4 } from 'uuid';
import Role from '../role/role.model';

export const getUsers = async (): Promise<User[]> => {
  const users = await User.findAll();
  if (!users.length) {
    throw new Error('No users were found');
  }
  return users;
};

export const getUser = async (userUuid: string): Promise<User> => {
  const user = await User.findByPk(userUuid, { include: Role });
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

export const isAdmin = async (user:User):Promise<boolean> => {
  if(user.role.name === 'Admin') {
    return true
  }
  return false
}

export const createUser = async (
  name: string,
  email: string
): Promise<void> => {
  const userExist: User = await User.findOne({
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
  const user: User = await User.findByPk(userUuid);
  const role: Role = await Role.findByPk(roleUuid);
  if (!user || !role) {
    throw new Error('User or role not found');
  }
  //@ts-ignore
  await user.setRole(role);
};
