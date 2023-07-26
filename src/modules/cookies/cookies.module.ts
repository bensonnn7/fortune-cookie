import { Module } from '@nestjs/common';
import { CookiesService } from './cookies.service';
import { CookiesController } from './cookies.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [CookiesController],
  providers: [CookiesService],
})
export class CookiesModule {}
