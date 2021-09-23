import { Optional } from 'sequelize/types';

export interface UserAttributes {
  uuid: string;
  name: string;
  email: string;
}
export interface UserCreationAttributes
  extends Optional<UserAttributes, 'uuid'> {}
