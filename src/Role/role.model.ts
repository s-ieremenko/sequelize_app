import {
  Model,
  PrimaryKey,
  Table,
  Column,
  AllowNull,
  NotEmpty,
  HasMany,
  BelongsToMany,
  IsUUID,
} from 'sequelize-typescript';

import Permission from '../permission/permission.model';
import PermissionRole from '../common/permission_role.model';
import User from '../user/user.model';
import { RoleAttributes, RoleCreationAttributes } from './role.interfaces';

@Table({
  tableName: 'roles',
  timestamps: true,
})
class Role extends Model<RoleAttributes, RoleCreationAttributes> {
  @PrimaryKey
  @IsUUID(4)
  @Column
  uuid!: string;

  @AllowNull(false)
  @NotEmpty
  @Column
  name!: string;

  @HasMany(() => User)
  users!: User[];

  @BelongsToMany(() => Permission, () => PermissionRole)
  permissions!: Permission[];
}

export default Role;
