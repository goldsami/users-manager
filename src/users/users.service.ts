import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private readonly _userModel: typeof User) {}

  findAll(): Promise<User[]> {
    return this._userModel.findAll();
  }
}
