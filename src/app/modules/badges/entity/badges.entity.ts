import { ApiProperty, } from '@nestjs/swagger';
import { IsString, IsUrl } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { UsersEntity } from '../../user/entity/users.entity';
import { UserBadgesEntity } from '../../users_badges/entity/users_badges.entity';


@Entity({ name: 'cda_badges' })
export class BadgesEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @IsString({ message: 'The slug field is empty.' })
    @Column()
    slug: string;

    @ApiProperty()
    @Column()
    @IsString({ message: 'The name field is empty.' })
    name: string;

    @ApiProperty()
    @IsUrl({}, { message: 'The image field is empty.' })
    @Column()
    image: string;

    @OneToMany(() => UserBadgesEntity, userBadge => userBadge.badge)
    userBadges: UserBadgesEntity[];

    @CreateDateColumn()
    created_at: string;

    @UpdateDateColumn()
    updated_at: string;
}