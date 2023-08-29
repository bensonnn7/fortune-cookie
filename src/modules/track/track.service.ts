import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track, ENTITY_STATUS } from './entities/track.entity';
import { User } from '../user/entities/user.entity';
@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track) private trackRepository: Repository<Track>,
  ) {}

  create(createTrackDto: CreateTrackDto, user: User) {
    const track = new Track();
    track.name = createTrackDto.name;
    track.url = createTrackDto.url;
    track.createdPrice = createTrackDto.createdPrice;
    track.targetPrice = createTrackDto.targetPrice;
    track.status = ENTITY_STATUS.PENDING;

    if (createTrackDto.percentChange && createTrackDto.createdPrice < 100) {
      track.targetPrice =
        track.createdPrice * (100 - createTrackDto.percentChange / 100);
    }
    // build relationship
    track.user = user;
    return this.trackRepository.save(track);
  }

  async getPendingTracks(): Promise<Track[]> {
    return await this.trackRepository.find({
      where: { status: ENTITY_STATUS.PENDING },
    });
  }

  async findAll(user: User) {
    // find all tracks belong to this user
    const tracks = await this.trackRepository.find({
      // where: { user },
      where: { user: { id: user.id } },
      // order: { createdAt: 'DESC' },
    });
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
