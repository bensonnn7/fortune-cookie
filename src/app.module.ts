import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/user/entities/user.entity';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { Track } from './modules/track/entities/track.entity';
import { TrackModule } from './modules/track/track.module';
import { NotificationModule } from './modules/notification/notification.module';
// import { CookiesModule } from './modules/cookies/cookies.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'fortune-cookie',
      entities: [User, Track],
      // entities: ['dist/**/*.entity{.ts,.js}'], // Path to your entity files
      synchronize: true,
      // poolSize: 10,
    }),
    UserModule,
    AuthModule,
    TrackModule,
    NotificationModule,
    // CookiesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
