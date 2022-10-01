import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { ValidationPipe } from './pipes/validation.pipe';
import { createProxyMiddleware } from 'http-proxy-middleware';

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
    const app = await NestFactory.create(AppModule, { cors: true });

    const API_SERVICE_URL = 'http://localhost:3001';

    app.use(
        createProxyMiddleware({
            target: API_SERVICE_URL,
            changeOrigin: true,
        }),
    );

    app.enableCors();

    initSwagger(app);

    app.useGlobalPipes(new ValidationPipe());

    await app.listen(port, () => {
        if (!isProduction) {
            console.log(`Server listening on http://localhost:${port}/`);
        }
    });
}

bootstrap();
