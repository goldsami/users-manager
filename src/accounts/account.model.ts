import { AllowNull, Column, Model, Table } from 'sequelize-typescript';

@Table
export class Account extends Model {
  @Column({ unique: true })
  login: string;

  @Column
  password: string;
}
