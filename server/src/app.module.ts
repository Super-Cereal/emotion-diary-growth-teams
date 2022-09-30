import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';

import { UserModel } from './users/users.model';
import { RoleModel } from './roles/roles.model';
import { UsersToRolesModel } from './roles/users-to-roles.model';
import { AuthModule } from './auth/auth.module';

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
        AuthModule,
    ],
})
export class AppModule {}
