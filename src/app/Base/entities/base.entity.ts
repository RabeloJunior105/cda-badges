import {
    IsDate,
    IsOptional
} from 'class-validator';
import {
    Column,
    CreateDateColumn,
    Generated,
    UpdateDateColumn
} from 'typeorm';

export class BaseEntity {
    @Generated('increment')
    @Column({ generated: 'increment', primary: true })
    id: number;

    @IsOptional({ always: false })
    @IsDate()
    @CreateDateColumn({ name: "DATA_CREATED", type: "datetime", default: () => "GETDATE()" })
    dataCreated: Date;

    @IsOptional({ always: false })
    @IsDate()
    @UpdateDateColumn({ name: 'DATA_UPDATED',  type: "datetime", default: () => "GETDATE()", onUpdate: "GETDATE()" })
    dataUpdated?: Date;
}

export class BaseImportEntity {
    @Generated('increment')
    @Column({ generated: 'increment', primary: true })
    id: number;

    @IsOptional({ always: false })
    @IsDate()
    @CreateDateColumn({ name: "RegisterDate", type: "datetime", default: () => "GETDATE()" })
    RegisterDate: Date;
}