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
  BelongsTo,
  IsUUID,
  IsIn,
} from 'sequelize-typescript';

import PERMISSIONS from '../common/enums';
import PermissionRole from '../common/permission_role.model';
import Role from '../role/role.model';
import {
  PermissionAttributes,
  PermissionCreationAttributes,
} from './permission.interfaces';

@Table({
  tableName: 'permissions',
  timestamps: true,
})
class Permission extends Model<
  PermissionAttributes,
  PermissionCreationAttributes
> {
  @PrimaryKey
  @IsUUID(4)
  @Column
  uuid!: string;

  @AllowNull(false)
  @NotEmpty
  @IsIn([
    [
      PERMISSIONS.CREATE,
      PERMISSIONS.READ,
      PERMISSIONS.UPDATE,
      PERMISSIONS.DELETE,
    ],
  ])
  @Column
  name!: string;

  @BelongsToMany(() => Role, () => PermissionRole)
  roles!: Role[];
}

export default Permission;
