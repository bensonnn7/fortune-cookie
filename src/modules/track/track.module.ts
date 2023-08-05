import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './entities/track.entity';
import { HttpModule } from '@nestjs/axios';
import { ScrapeService } from './scrape.service';
@Module({
  imports: [TypeOrmModule.forFeature([Track]), HttpModule],
  controllers: [TrackController],
  providers: [TrackService, ScrapeService],
})
export class TrackModule {}
