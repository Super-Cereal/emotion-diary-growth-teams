import { join } from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServeStaticModule } from '@nestjs/serve-static';

import { UsersModule } from './modules/users/users.module';

import { UserModel } from './modules/users/users.model';
import { ImagesModule } from './modules/images/images.module';
import { ImagesModel } from './modules/images/images.model';
import { AuthModule } from './modules/auth/auth.module';
import { EmotionsModule } from './modules/emotions/emotions.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRESS_HOST,
            port: Number(process.env.POSTGRESS_PORT),
            username: process.env.POSTGRESS_USER,
            password: process.env.POSTGRESS_PASSWORD,
            database: process.env.POSTGRESS_BD,
            models: [UserModel, ImagesModel],
            autoLoadModels: true,
        }),
        ServeStaticModule.forRoot({
            serveRoot: '/api/v1/static',
            rootPath: join(__dirname, '..', 'static')
        }),
        UsersModule,
        ImagesModule,
        AuthModule,
        EmotionsModule,
    ],
})
export class AppModule {}
export class AppModuleServer {}
