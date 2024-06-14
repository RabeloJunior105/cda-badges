import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CrudBaseController } from 'src/app/Base/base.controller';
import { BadgesService } from './badges.service';
import { BadgesEntity } from './entity/badges.entity';

@ApiTags('Badges')
@Controller('badges')
export class BadgesController extends CrudBaseController(BadgesEntity, {}) {
  constructor(
    public service: BadgesService,
  ) {
    super(service)
  }

}