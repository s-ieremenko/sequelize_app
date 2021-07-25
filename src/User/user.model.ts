import {
  Model,
  ForeignKey,
  PrimaryKey,
  Column,
  AllowNull,
  NotEmpty,
  Table,
  IsUUID,
  IsEmail,
  BelongsTo,
} from 'sequelize-typescript';

import Role from '../Role/role.model';
import { UserAttributes, UserCreationAttributes } from './user.interfaces';

@Table({
  tableName: 'users',
  timestamps: true,
})
class User extends Model<UserAttributes, UserCreationAttributes> {
  @PrimaryKey
  @IsUUID(4)
  @Column
  uuid!: string;

  @AllowNull(false)
  @NotEmpty
  @Column
  name!: string;

  @AllowNull(false)
  @NotEmpty
  @IsEmail
  @Column
  email!: string;

  @ForeignKey(() => Role)
  @Column
  roleId!: string;

  @BelongsTo(() => Role)
  role!: Role;
}
export default User;
