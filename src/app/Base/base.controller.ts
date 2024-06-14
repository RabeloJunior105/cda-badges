import { Controller, Type } from '@nestjs/common';
import { Crud, CrudController, CrudAuth } from '@dataui/crud';
import { Repository } from 'typeorm';
import { BaseService } from './base.service';

export abstract class BaseController<T> {
    constructor(
        public service: BaseService<T>,
    ) { }
}

export function CrudBaseController<T>(
    entity: Type<T>,
    crudOptions?: Record<string, any>,
): Type<BaseController<T>> {
    @Crud({
        model: {
            type: entity,
        },
        routes: {
            deleteOneBase: {
                returnDeleted: true,
            },
        },
        ...crudOptions,
        query: {
            alwaysPaginate: true,
            limit: 20,
            ...crudOptions.query
        },


    })
    @Controller('base')
    class CrudBaseControllerClass implements CrudController<T> {
        private readonly repository: Repository<T>;
        constructor(
            public service: BaseService<T>,
        ) { }

    }

    return CrudBaseControllerClass;
}

