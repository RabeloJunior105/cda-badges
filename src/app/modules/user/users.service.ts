import { Injectable } from '@nestjs/common';
import { UsersEntity } from './entity/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/app/Base/base.service';
import { Repository } from 'typeorm';


@Injectable()
export class UsersService extends BaseService<UsersEntity> {
    constructor(
        @InjectRepository(UsersEntity) repo: Repository<UsersEntity>
    ) {
        super(repo)
    }
}