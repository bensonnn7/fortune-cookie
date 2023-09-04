import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ENTITY_STATUS } from './entities/product.entity';
import { User } from '../user/entities/user.entity';
@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private trackRepository: Repository<Product>,
  ) {}

  create(createTrackDto: CreateProductDto, user: User) {
    const product = new Product();
    product.name = createTrackDto.name;
    product.url = createTrackDto.url;
    product.createdPrice = createTrackDto.createdPrice;
    product.targetPrice = createTrackDto.targetPrice;
    product.source = createTrackDto.source;
    product.status = ENTITY_STATUS.PENDING;

    if (createTrackDto.percentChange && createTrackDto.createdPrice < 100) {
      product.targetPrice =
        product.createdPrice * (100 - createTrackDto.percentChange / 100);
    }
    // build relationship
    product.user = user;
    return this.trackRepository.save(product);
  }

  async getPendingTracks(): Promise<Product[]> {
    return await this.trackRepository.find({
      relations: ['user'],
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

  async findOne(id: number) {
    const tracks = await this.trackRepository.find({
      where: { id },
    });
    return tracks;
  }

  update(id: number, updateTrackDto: UpdateProductDto) {
    return `This action updates a #${id} track`;
  }

  remove(id: number) {
    return `This action removes a #${id} track`;
  }
}
