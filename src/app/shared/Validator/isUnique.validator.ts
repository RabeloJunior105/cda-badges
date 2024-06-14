import { Injectable } from "@nestjs/common"
import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator"
import { EntityManager } from "typeorm"

export type IsUniqeInterface = {
    fieldName: string,
    tableName: string,
    column: string
}

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {
    constructor(private readonly entityManager: EntityManager) { }

    async validate(
        value: any,
        args?: ValidationArguments
    ): Promise<boolean> {
        const dataExist = await this.entityManager.getRepository(args.targetName).findOne({ where: { [args.property]: args.value } })

        return !dataExist
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        const field: string = validationArguments.property
        return `${field} is already exist`
    }
}

export function IsUnique(options?: any, validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: propertyName,
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsUniqueConstraint,
        })
    }
}