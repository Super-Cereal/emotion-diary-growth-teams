import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

const port = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

const initSwagger = (app: INestApplication) => {
    const config = new DocumentBuilder()
        .setTitle('GROWTH TEAMS: Тот самый хакатон')
        .setDescription('Документация REST API')
        .setVersion('1.0.0')
        .addTag('GROWTH TEAMS')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/v1/swagger', app, document);
};

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    initSwagger(app);

    await app.listen(port, () => {
        if (!isProduction) {
            console.log(`Server listening on http://localhost:${port}/`);
        }
    });
}

bootstrap();
