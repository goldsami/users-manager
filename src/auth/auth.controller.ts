import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsNotEmpty } from 'class-validator';

class AuthDto {
    @IsNotEmpty()
    login: string;

    @IsNotEmpty()
    password: string;
}

@Controller('auth')
export class AuthController {
    constructor(
        private readonly _authService: AuthService
    ) {}

    @HttpCode(HttpStatus.OK)
    @Post('sign-up')
    signUp(@Body() body: AuthDto) {
        return this._authService.signUp(body.login, body.password)
    }

    @HttpCode(HttpStatus.OK)
    @Post('sign-in')
    signIn(@Body() body: AuthDto) {
        return this._authService.signIn(body.login, body.password)
    }
}
