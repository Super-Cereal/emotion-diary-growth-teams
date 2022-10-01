import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { UsersModule } from './modules/users/users.module';

import { UserModel } from './modules/users/users.model';
import { ImagesModule } from './modules/images/images.module';
import { ImagesModel } from './modules/images/images.model';
import { AuthModule } from './modules/auth/auth.module';

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
        UsersModule,
        ImagesModule,
        AuthModule,
    ],
})
export class AppModule {}
