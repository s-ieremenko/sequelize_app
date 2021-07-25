import { Optional } from 'sequelize/types';

export interface PermissionAttributes {
  uuid: string;
  name: string;
}
export interface PermissionCreationAttributes
  extends Optional<PermissionAttributes, 'uuid'> {}
