import { Request } from 'express';
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

export const createPermission = async (request: Request): Promise<void> => {
  const name: string = request.body.name;
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
export const deletePermission = async (request: Request): Promise<void> => {
  const permissionUuid = request.body.permissionUuid;
  const permission = await Permission.findByPk(permissionUuid);
  if (!permission) {
    throw new Error('Wrong permission uuid');
  }
  await permission.destroy();
};
