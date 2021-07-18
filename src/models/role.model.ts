import {
  Model,
  ForeignKey,
  PrimaryKey,
  Table,
  Column,
  AllowNull,
  NotEmpty,
  HasMany,
  BelongsToMany,
  IsEmail,
  IsUUID,
  Length,
} from 'sequelize-typescript';
import Permission from './permission.model';
import PermissionRole from './permission_role.model';
import User from './user.model';

@Table({
  tableName: 'roles',
  timestamps: false,
})
class Role extends Model {
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
