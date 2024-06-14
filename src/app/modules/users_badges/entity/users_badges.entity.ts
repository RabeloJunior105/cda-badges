import { ApiProperty, } from '@nestjs/swagger';
import { IsString, IsUrl } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UsersEntity } from '../../user/entity/users.entity';
import { BadgesEntity } from '../../badges/entity/badges.entity';

@Entity({ name: 'cda_users_badges' })
export class UserBadgesEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UsersEntity, user => user.userBadges)
    @JoinColumn({ name: 'user_id' })
    user: UsersEntity;

    @ManyToOne(() => BadgesEntity, badge => badge.userBadges)
    @JoinColumn({ name: 'badge_id' })
    badge: BadgesEntity;

    @ApiProperty()
    @Column()
    user_id: number;

    @ApiProperty()
    @Column()
    badge_id: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    redeemedAt: Date;

    @CreateDateColumn()
    created_at: string;

    @UpdateDateColumn()
    updated_at: string;
}