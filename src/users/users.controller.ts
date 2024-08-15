import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { User } from './user.model';
import { UsersService } from './users.service';
import { IsNotEmpty, IsEmail, IsPhoneNumber } from 'class-validator';
import { AuthGuard } from 'src/auth/auth.guard';

class UserDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber()
  phone: string;
}

@Controller('api/v1')
export class UsersController {
  constructor(private readonly _usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get('get-user/:id')
  findOne(@Param('id') id: string): Promise<User> {
    return this._usersService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Post('add-user')
  add(@Body() body: UserDto) {
    return this._usersService.add(body);
  }
}
