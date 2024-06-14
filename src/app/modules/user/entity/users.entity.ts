import { ApiProperty, } from '@nestjs/swagger';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { IsUnique } from 'src/app/shared/Validator/isUnique.validator';
import { UserBadgesEntity } from '../../users_badges/entity/users_badges.entity';

@Entity({ name: 'cda_users' })
export class UsersEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @IsString({ message: 'The slug field is empty.' })
    @Column()
    name: string;

    @ApiProperty()
    @Column()
    @IsUnique()
    @IsEmail({}, { message: 'The email field not is valid' })
    email: string;

    @ApiProperty()
    @IsStrongPassword()
    @Column()
    password: string;

    @CreateDateColumn()
    created_at?: string;

    @UpdateDateColumn()
    updated_at?: string;

    @OneToMany(() => UserBadgesEntity, userBadge => userBadge.user)
    userBadges: UserBadgesEntity[];

    @BeforeInsert()
    async encryptPassword() {
        this.password = await bcrypt.hash(this.password, 10)
    }

    @BeforeUpdate()
    async updateEncryptPassword() {
        if (this.password)
            this.password = await bcrypt.hash(this.password, 10)
    }
}   