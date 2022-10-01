import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { ImagesModel } from './images.model';
import { UserModel } from '../users/users.model';

@Injectable()
export class ImagesService {
    constructor(
        @InjectModel(ImagesModel) private imagesRepository: typeof ImagesModel,
        @InjectModel(UserModel) private userRepository: typeof UserModel,
    ) {}

    async uploadImage(image: Express.Multer.File, userName: string) {
        const { path, mimetype } = image;

        return await this.imagesRepository.create({
            path,
            mimetype,
            userName,
        });
    }
}
