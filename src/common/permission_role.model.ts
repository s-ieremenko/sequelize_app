import { Model, ForeignKey, Table } from 'sequelize-typescript';

import Permission from '../permission/permission.model';
import Role from '../role/role.model';

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
