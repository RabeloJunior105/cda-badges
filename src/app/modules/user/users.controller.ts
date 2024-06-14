import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CrudBaseController } from 'src/app/Base/base.controller';
import { UsersService } from './users.service';
import { UsersEntity } from './entity/users.entity';
import { Override } from '@dataui/crud';

@ApiTags('Users')
@Controller('users')
export class UsersController extends CrudBaseController(UsersEntity, {
  query: {
    join: {
      user: {
        exclude: ['password']
      }
    }
  }
}) {
  constructor(
    public service: UsersService,
  ) {
    super(service)
  }
}
