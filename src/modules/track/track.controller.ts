import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  create(@Request() req, @Body() createTrackDto: CreateTrackDto) {
    const userId = req.user.userId;
    return this.trackService.create(createTrackDto, userId);
  }

  @Get()
  findAll(@Request() req) {
    const userId = req.user.userId;
    return this.trackService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trackService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto) {
    return this.trackService.update(+id, updateTrackDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trackService.remove(+id);
  }
}
