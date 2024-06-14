import { Module, forwardRef } from '@nestjs/common';
import { UserBadgesController } from './users_badges.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserBadgesService } from './users_badges.service';
import { UserBadgesEntity } from './entity/users_badges.entity';
import { UsersModule } from '../user/users.module';
import { BadgesModule } from '../badges/badges.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserBadgesEntity]),
    forwardRef(() => UsersModule),
    forwardRef(() => BadgesModule)
  ],
  controllers: [UserBadgesController],
  providers: [UserBadgesService],
  exports: [UserBadgesService]
})
export class UserBadgesModule { }
