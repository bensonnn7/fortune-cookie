import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/user/entities/user.entity';
import { UserController } from './modules/user/user.controller';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { CookiesModule } from './modules/cookies/cookies.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'fortune-cookie',
      entities: [User],
      // entities: ['dist/**/*.entity{.ts,.js}'], // Path to your entity files
      synchronize: true,
      // poolSize: 10,
    }),
    UserModule,
    AuthModule,
    CookiesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
