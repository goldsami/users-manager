import { Injectable } from '@nestjs/common';
import { Account } from './account.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AccountsService {
  constructor(@InjectModel(Account) private readonly _accountModel: typeof Account) {}

   findOne(login: string): Promise<Account | undefined> {
    return this._accountModel.findOne({
        where: { login }
    })
  }
}
