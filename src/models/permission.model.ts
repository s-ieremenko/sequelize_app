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
import PERMISSIONS from '../enums';
import PermissionRole from './permission_role.model';
import Role from './role.model';

@Table({
  tableName: 'permissions',
  timestamps: false,
})
class Permission extends Model {
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
