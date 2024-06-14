import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CrudBaseController } from 'src/app/Base/base.controller';
import { UserBadgesService } from './users_badges.service';
import { UserBadgesEntity } from './entity/users_badges.entity';
import { Override } from '@dataui/crud';

@ApiTags('Badges Redeem')
@Controller('user/badges/redeem')
export class UserBadgesController extends CrudBaseController(UserBadgesEntity, {
  query: {
    join: {
      user: {
        eager: true,
        exclude: ['password']
      },
      badge: {
        eager: true,
      },
    },
  },
  routes: {
    exclude: ['createManyBase', 'updateOneBase', 'replaceOneBase']
  }
}) {
  constructor(
    public service: UserBadgesService,
  ) {
    super(service)
  }

  @Override('createOneBase')
  @Post()
  async create(@Body() data: UserBadgesEntity) {
    return await this.service.create(data)
  }
}