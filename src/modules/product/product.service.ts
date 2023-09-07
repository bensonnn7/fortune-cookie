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
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto, user: User) {
    const product = new Product();
    product.name = createProductDto.name;
    product.url = createProductDto.url;
    product.createdPrice = createProductDto.createdPrice;
    product.targetPrice = createProductDto.targetPrice;
    product.source = createProductDto.source;
    product.status = ENTITY_STATUS.PENDING;

    if (createProductDto.percentChange && createProductDto.createdPrice < 100) {
      product.targetPrice =
        product.createdPrice * (100 - createProductDto.percentChange / 100);
    }
    // build relationship
    product.user = user;
    return this.productRepository.save(product);
  }

  async getPendingProducts(): Promise<Product[]> {
    return await this.productRepository.find({
      relations: ['user'],
      where: { status: ENTITY_STATUS.PENDING },
    });
  }

  async findAll(user: User) {
    const products = await this.productRepository.find({
      // where: { user },
      where: { user: { id: user.id } },
      // order: { createdAt: 'DESC' },
    });
    return products;
  }

  async findOne(id: number) {
    const products = await this.productRepository.find({
      where: { id },
    });
    return products;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
