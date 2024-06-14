import { Module } from '@nestjs/common';
import { BadgesController } from './badges.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BadgesEntity } from './entity/badges.entity';
import { BadgesService } from './badges.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([BadgesEntity])
  ],
  controllers: [BadgesController],
  providers: [BadgesService],
  exports: [BadgesService]
})
export class BadgesModule { }
