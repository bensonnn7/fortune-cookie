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
  Query,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ScrapingService } from './scrape.service';
const TEST_URL =
  'https://www.amazon.com/Protection-Removable-Stainless-Adjustable-Thickness/dp/B07S5R3HHV/ref=pd_ci_mcx_mh_mcx_views_0?pd_rd_w=w25aA&content-id=amzn1.sym.0250fb24-4363-44d0-b635-ac15f859c3b5%3Aamzn1.symc.40e6a10e-cbc4-4fa5-81e3-4435ff64d03b&pf_rd_p=0250fb24-4363-44d0-b635-ac15f859c3b5&pf_rd_r=39131JNC7SCHE6PHBPPE&pd_rd_wg=xF5KV&pd_rd_r=d424ed01-26e8-4d20-b823-10879cca0f41&pd_rd_i=B07S5R3HHV';
@UseGuards(JwtAuthGuard)
@Controller('track')
export class TrackController {
  constructor(
    private readonly trackService: TrackService,
    private readonly scrapingService: ScrapingService,
  ) {}

  @Post()
  create(@Request() req, @Body() createTrackDto: CreateTrackDto) {
    const userId = req.user.userId;
    return this.trackService.create(createTrackDto, userId);
  }

  @Get('test')
  async test(@Request() req) {
    return await this.scrapingService.getProductInfo(TEST_URL);
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
