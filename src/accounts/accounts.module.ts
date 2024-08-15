import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { Account } from './account.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Account])],
  providers: [AccountsService],
  exports: [AccountsService, SequelizeModule],
})
export class AccountsModule {}
