import {
  Model,
  ForeignKey,
  PrimaryKey,
  Column,
  AllowNull,
  NotEmpty,
  HasMany,
  BelongsToMany,
  Table,
  IsUUID,
  IsEmail,
  BelongsTo,
} from 'sequelize-typescript';
import Permission from './permission.model';
import Role from './role.model';

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
