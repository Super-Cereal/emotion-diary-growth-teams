import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from '../users/users.model';
import { UsersModule } from '../users/users.module';
import { ImagesModel } from './images.model';

@Module({
    controllers: [ImagesController],
    providers: [ImagesService],
    imports: [
        SequelizeModule.forFeature([ImagesModel, UserModel]),
        UsersModule,
    ],
})
export class ImagesModule {}
