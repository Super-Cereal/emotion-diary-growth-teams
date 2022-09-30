import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(UserModel) private userRepository: typeof UserModel,
        private roleService: RolesService,
    ) {}

    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto);
        const role = await this.roleService.getByRole('user');

        await user.$set('roles', [role]);

        return user;
    }

    async getAllUsers() {
        return await this.userRepository.findAll({ include: { all: true } });
    }
}
