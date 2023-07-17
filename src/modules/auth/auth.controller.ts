import {
  Post,
  Get,
  Request,
  Body,
  Controller,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './auth.dto';
import { AuthGuard } from './auth.guard';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  emailSignIn(@Body() signInDto: SignInDto) {
    return this.authService.emailSignIn(signInDto.email, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('test')
  getProfile(@Request() req) {
    return req.user;
  }
}
