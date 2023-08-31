import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/user/entities/user.entity';
import { UserModule } from './modules/user/user.module';
//
import { AuthModule } from './modules/auth/auth.module';
//
import { Product } from './modules/product/entities/product.entity';
import { ProductModule } from './modules/product/product.module';
//
import { Notification } from './modules/notification/notification.entity';
import { NotificationModule } from './modules/notification/notification.module';
import { ScheduleModule } from '@nestjs/schedule';

// import { CookiesModule } from './modules/cookies/cookies.module';
@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'fortune-cookie',
      entities: [User, Product, Notification],
      // entities: ['dist/**/*.entity{.ts,.js}'], // Path to your entity files
      synchronize: true,
      // poolSize: 10,
    }),
    UserModule,
    AuthModule,
    ProductModule,
    NotificationModule,
    // CookiesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
