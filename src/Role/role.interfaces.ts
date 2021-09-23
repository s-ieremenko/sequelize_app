import { Optional } from 'sequelize/types';

export interface RoleAttributes {
  uuid: string;
  name: string;
}
export interface RoleCreationAttributes
  extends Optional<RoleAttributes, 'uuid'> {}
