import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { RoleModel } from './roles.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from '../users/users.model';
import { UsersToRolesModel } from './users-to-roles.model';

@Module({
    providers: [RolesService],
    controllers: [RolesController],
    imports: [
        SequelizeModule.forFeature([RoleModel, UserModel, UsersToRolesModel]),
    ],
    exports: [RolesService],
})
export class RolesModule {}
