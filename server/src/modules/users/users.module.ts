import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from './users.model';

@Module({
    providers: [UsersService],
    controllers: [UsersController],
    imports: [SequelizeModule.forFeature([UserModel])],
    exports: [UsersService],
})
export class UsersModule {}
