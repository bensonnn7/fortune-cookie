import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import { compareSync } from 'bcrypt';

import { JwtService } from '@nestjs/jwt';
import { User } from 'src/modules/user/entities/user.entity';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUserByEmailPass(email: string, pass: string): Promise<User> {
    const user = await this.userService.findByEmail(email);
    if (user && !compareSync(pass, user.password)) {
      throw new UnauthorizedException();
    }
    return user;
  }

  // async generateJwtToken(id: string, name: string): Promise<String> {
  async generateJwtToken(id: string, name: string) {
    const payload = { username: name, sub: id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
