import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { HttpModule } from '@nestjs/axios';
import { ScrapingService } from './scrape.service';
import { NotificationModule } from '../notification/notification.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    HttpModule,
    NotificationModule,
  ],
  controllers: [ProductController],
  providers: [ProductService, ScrapingService],
})
export class ProductModule {}
