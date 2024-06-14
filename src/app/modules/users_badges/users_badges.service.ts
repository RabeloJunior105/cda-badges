import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/app/Base/base.service';
import { Repository } from 'typeorm';
import { UserBadgesEntity } from './entity/users_badges.entity';
import { BadgesService } from '../badges/badges.service';
import { UsersService } from '../user/users.service';
import { AppError } from 'src/app/shared/Error/AppError';

@Injectable()
export class UserBadgesService extends BaseService<UserBadgesEntity> {
    constructor(
        @InjectRepository(UserBadgesEntity) repo: Repository<UserBadgesEntity>,
        private readonly BadgesServices: BadgesService,
        private readonly UsersService: UsersService,
    ) {
        super(repo)
    }

    async create(data: UserBadgesEntity) {
        const findUser = await this.UsersService.findOne({
            where: {
                id: data.user_id
            }
        })

        if (!findUser)
            throw new AppError("User not exists", 404)

        data.user = findUser;

        const findBadges = await this.BadgesServices.findOne({
            where: {
                id: data.badge_id
            }
        })

        if (!findBadges)
            throw new AppError("Badges not exists", 404)

        data.badge = findBadges;

        const verifyIsAlreadyExists = await this.repo.findOne({
            where: {
                user_id: data.user_id,
                badge_id: data.badge_id
            }
        })

        if (verifyIsAlreadyExists)
            throw new AppError("This user already has this badge")

        return await this.repo.save(data)
    }

}