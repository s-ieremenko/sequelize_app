import { v4 as uuidv4 } from 'uuid';
import Permission from './permission.model';

export const getPermissions = async (): Promise<Permission[]> => {
  const permissionIds = await Permission.findAll({
    attributes: ['uuid', 'name'],
  });
  if (!permissionIds.length) {
    throw new Error('No permissions were found');
  }
  return permissionIds;
};

export const createPermission = async (name: string): Promise<void> => {
  const permissionExist: Permission = await Permission.findOne({
    where: {
      name,
    },
  });
  if (permissionExist) {
    throw new Error('Permission already exists');
  }
  await Permission.create({
    uuid: uuidv4(),
    name,
  });
};
export const deletePermission = async (
  permissionUuid: string
): Promise<void> => {
  const permission = await Permission.findByPk(permissionUuid);
  if (!permission) {
    throw new Error('Wrong permission uuid');
  }
  await permission.destroy();
};
