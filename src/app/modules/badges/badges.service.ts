import { Injectable } from '@nestjs/common';
import { BadgesEntity } from './entity/badges.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/app/Base/base.service';
import { Repository } from 'typeorm';

@Injectable()
export class BadgesService extends BaseService<BadgesEntity> {
    constructor(
        @InjectRepository(BadgesEntity) repo: Repository<BadgesEntity>
    ) {
        super(repo)
    }

}