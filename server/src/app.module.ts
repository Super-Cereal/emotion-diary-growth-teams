import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { UsersModule } from './modules/users/users.module';
import { RolesModule } from './modules/roles/roles.module';

import { UserModel } from './modules/users/users.model';
import { RoleModel } from './modules/roles/roles.model';
import { UsersToRolesModel } from './modules/roles/users-to-roles.model';

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
            models: [UserModel, RoleModel, UsersToRolesModel],
            autoLoadModels: true,
        }),
        UsersModule,
        RolesModule,
    ],
})
export class AppModule {}
