import { Injectable, Scope, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { SaveEmotionStateDto } from './dto/save-emotion-state.dto';
import { InjectModel } from '@nestjs/sequelize';
import { EmotionStateModel } from './emotion-state.model';
import { REQUEST } from '@nestjs/core';

import { Request } from 'express';
import { UsersService } from '../users/users.service';

@Injectable({ scope: Scope.REQUEST })
export class EmotionStateService {
    constructor(
        @InjectModel(EmotionStateModel) private emotionStateRepository: typeof EmotionStateModel,
        private usersService: UsersService,
        @Inject(REQUEST) private req: Request
    ) {}

    async getEmotions() {
        // @ts-ignore
        return this.usersService.getUserEmotions(this.req.user.name);
    }

    async saveEmotionState(dto: SaveEmotionStateDto) {
        // @ts-ignore
        const userName = this.req.user.name;

        if (!userName) {
            throw new HttpException('Нет юзернейма', HttpStatus.BAD_REQUEST);
        }

        return this.emotionStateRepository.create({ ...dto, userName });
    }
}
