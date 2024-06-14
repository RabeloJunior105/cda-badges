import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { uniq } from 'lodash';
import { Repository } from 'typeorm';

@Injectable()
export class BaseService<TEntity> extends TypeOrmCrudService<TEntity> {
    constructor(
        repo: Repository<TEntity>,
    ) {
        super(repo);
    }

    getSelect(query: any, options: any) {
        return uniq(super.getSelect(query, options));
    }

}
