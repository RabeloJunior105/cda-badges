import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from './app/shared/Pipes/validation.pipe';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { BadgesModule } from './app/modules/badges/badges.module';
import { UsersModule } from './app/modules/user/users.module';
import { IsUniqueConstraint } from './app/shared/Validator/isUnique.validator';
import { UserBadgesModule } from './app/modules/users_badges/users_badges.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'viaduct.proxy.rlwy.net',
      username: 'root',
      password: 'AKzAKDYxtedVBhpECxZpjCKJtoJJLYAU',
      port: 59353,
      database: "railway",
      synchronize: true,
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
    }),
    BadgesModule,
    UsersModule,
    UserBadgesModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    IsUniqueConstraint
  ],
})
export class AppModule { }
