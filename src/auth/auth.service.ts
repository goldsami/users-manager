import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AccountsService } from '../accounts/accounts.service';
import * as bcrypt from 'bcrypt';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly _jwtOptions: JwtSignOptions = {
    secret: process.env.JWT_SECRET,
  };
  constructor(
    private readonly _accountsService: AccountsService,
    private readonly _jwtService: JwtService,
  ) {}

  async signUp(login: string, password: string): Promise<string> {
    const existingAccount = await this._accountsService.findOne(login);
    if (existingAccount) {
      throw new ConflictException('Account with this login already exists');
    }
    const hashedPassword = await this._hashPassword(password);
    const account = await this._accountsService.add(login, hashedPassword);
    return this._jwtService.signAsync(
      {
        accountId: account.id,
      },
      this._jwtOptions,
    );
  }

  async signIn(login: string, password: string): Promise<string> {
    const account = await this._accountsService.findOne(login);
    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    return this._jwtService.signAsync(
      {
        accountId: account.id,
      },
      this._jwtOptions,
    );
  }

  private async _hashPassword(password: string, rounds = 8): Promise<string> {
    return bcrypt.hash(password, rounds);
  }
}
