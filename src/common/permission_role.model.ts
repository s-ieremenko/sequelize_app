import { Model, ForeignKey, Table } from 'sequelize-typescript';

import Permission from '../Permission/permission.model';
import Role from '../Role/role.model';

@Table({
  tableName: 'permission_role',
  timestamps: false,
})
class PermissionRole extends Model {
  @ForeignKey(() => Permission)
  permissionId!: string;

  @ForeignKey(() => Role)
  roleId!: string;
}
export default PermissionRole;
