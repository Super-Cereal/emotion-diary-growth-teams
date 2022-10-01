import {
    Controller,
    Post,
    UseInterceptors,
    UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ImagesService } from './images.service';

@Controller('images')
export class ImagesController {
    constructor(private imagesService: ImagesService) {}

    @Post()
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: './loaded',
                filename: (req, file, cb) => {
                    const randomName = Array(32)
                        .fill(null)
                        .map(() => Math.round(Math.random() * 16).toString(16))
                        .join('');
                    return cb(
                        null,
                        `${randomName}${extname(file.originalname)}`,
                    );
                },
            }),
        }),
    )
    async uploadImage(@UploadedFile() image: Express.Multer.File) {
        await this.imagesService.uploadImage(image, 'aboba');
    }
}
