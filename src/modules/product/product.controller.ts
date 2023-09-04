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
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ScrapingService } from './scrape.service';

@UseGuards(JwtAuthGuard)
@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly scrapingService: ScrapingService,
  ) {}

  @Post()
  create(@Request() req, @Body() createTrackDto: CreateProductDto) {
    const user = req.user;
    return this.productService.create(createTrackDto, user);
  }

  @Get()
  async findAll(@Request() req) {
    return this.productService.findAll(req.user);
  }

  @Get('test')
  async test(@Request() req) {
    return await this.scrapingService.startScraping();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrackDto: UpdateProductDto) {
    return this.productService.update(+id, updateTrackDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
