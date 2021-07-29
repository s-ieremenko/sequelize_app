import Role from './role.model';
import { v4 as uuidv4 } from 'uuid';
import Permission from '../permission/permission.model';

export const getRolesWithPermissions = async (): Promise<Role[]> => {
  const roles: Role[] = await Role.findAll({
    include: {
      model: Permission,
      through: { attributes: [] },
    },
  });
  if (!roles.length) {
    throw new Error('No roles were found');
  }
  return roles;
};

export const createRoleWithPermissions = async (
  name: string,
  permissionUuids: string[]
): Promise<void> => {
  const permissions: Permission[] = await Permission.findAll({
    where: {
      uuid: permissionUuids,
    },
  });
  if (!permissions.length) {
    throw new Error('Wrong permissionUuids');
  }
  const role: Role = await Role.create({
    uuid: uuidv4(),
    name,
  });
  // await role.$add('permissions', permissions);
  //@ts-ignore
  await role.addPermissions(permissions);
};

export const addPermissionToRole = async (
  permissionUuid: string,
  roleUuid: string
): Promise<void> => {
  const role: Role = await Role.findByPk(roleUuid, { include: Permission });
  const permission: Permission = await Permission.findByPk(permissionUuid, {});
  if (!role || !permission) {
    throw new Error('Incorrect data');
  }
  if (role.permissions.includes(permission)) {
    throw new Error('Permission already exists');
  }
  //@ts-ignore
  role.addPermission(permission);
};
