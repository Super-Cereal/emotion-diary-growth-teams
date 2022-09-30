import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RoleModel } from './roles.model';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesService {
    constructor(
        @InjectModel(RoleModel) private roleRepository: typeof RoleModel,
    ) {}

    async create(dto: CreateRoleDto) {
        return await this.roleRepository.create(dto);
    }

    async getByRole(role: string) {
        return await this.roleRepository.findOne({ where: { role } });
    }

    async getAll() {
        return await this.roleRepository.findAll();
    }
}
