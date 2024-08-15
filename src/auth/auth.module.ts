import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AccountsModule } from '../accounts/accounts.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    AccountsModule,
    JwtModule.register({
      global: true,
    })
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
