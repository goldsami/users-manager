import { ConflictException, Injectable } from '@nestjs/common';
import { User } from './user.model';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private readonly _userModel: typeof User) {}

  findAll(): Promise<User[]> {
    return this._userModel.findAll();
  }

  findOne(id: string): Promise<User> {
    return this._userModel.findByPk(id)
  }

  async add(userData: Pick<User, 'firstName' | 'lastName' | 'email' | 'phone'>): Promise<User> {
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [
          {email: userData.email},
          {phone: userData.phone},
        ]
      }
    })
    if (existingUser) {
      throw new ConflictException('User with such email or phone already exists')
    }
    const date = new Date();
    const user = User.build({
      ...userData,
      createdAt: date,
      updatedAt: date,
    })
    return user.save()
  }
}
