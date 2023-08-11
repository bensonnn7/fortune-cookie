import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './entities/track.entity';
import { HttpModule } from '@nestjs/axios';
import { ScrapingService } from './scrape.service';
import { NotificationModule } from '../notification/notification.module';
@Module({
  imports: [TypeOrmModule.forFeature([Track]), HttpModule, NotificationModule],
  controllers: [TrackController],
  providers: [TrackService, ScrapingService],
})
export class TrackModule {}
