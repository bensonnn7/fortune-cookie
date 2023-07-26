import { Controller, Get } from '@nestjs/common';
import { CookiesService } from './cookies.service';
@Controller('cookies')
export class CookiesController {
  constructor(private readonly cookiesService: CookiesService) {}

  @Get()
  getRandCookie() {
    return this.cookiesService.getRandCookie();
  }
}
