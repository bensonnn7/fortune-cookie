import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import { bcrypt } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async emailSignIn(email: string, pass: string) {
    const user = await this.userService.findByEmail(email);
    if (!user || user.password !== pass) {
      throw new UnauthorizedException();
    }
    // if (user && (await bcrypt.compare(pass, user.password))) {
    //   throw new UnauthorizedException();
    // }
    const payload = { sub: user.id, username: user.name };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}