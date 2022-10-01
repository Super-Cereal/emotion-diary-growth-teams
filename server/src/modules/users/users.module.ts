import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from './users.model';
import { ImagesModel } from '../images/images.model';
import { AuthModule } from '../auth/auth.module';

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    imports: [
        SequelizeModule.forFeature([UserModel, ImagesModel]),
        forwardRef(() => AuthModule),
    ],
    exports: [UsersService],
})
export class UsersModule {}
