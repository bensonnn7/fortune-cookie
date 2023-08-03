import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track) private trackRepository: Repository<Track>,
  ) {}

  create(createTrackDto: CreateTrackDto, userId: number) {
    const track = new Track();
    track.name = createTrackDto.name;
    track.url = createTrackDto.url;
    track.createdPrice = createTrackDto.createdPrice;
    track.targetPrice = createTrackDto.targetPrice;
    track.userId = userId;
    if (createTrackDto.percentChange && createTrackDto.createdPrice < 100) {
      track.targetPrice =
        track.createdPrice * (100 - createTrackDto.percentChange / 100);
    }
    return this.trackRepository.save(track);
  }

  async findAll(userId: number) {
    const tracks = await this.trackRepository.find({ where: { userId } });
    return tracks;
  }

  findOne(id: number) {
    return `This action returns a #${id} track`;
  }

  update(id: number, updateTrackDto: UpdateTrackDto) {
    return `This action updates a #${id} track`;
  }

  remove(id: number) {
    return `This action removes a #${id} track`;
  }
}
