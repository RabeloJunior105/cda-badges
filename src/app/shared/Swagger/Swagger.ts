import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export const config = new DocumentBuilder()
    .setTitle('CDA Badges Challenge')
    .setDescription('This is challenge Badges CDA RP')
    .setVersion('0.1')
    .build();
