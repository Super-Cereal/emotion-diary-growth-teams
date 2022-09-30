import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';

@Controller('roles')
export class RolesController {
    constructor(private roleService: RolesService) {}

    @Post()
    create(@Body() dto: CreateRoleDto) {
        return this.roleService.create(dto);
    }

    @Get('/:role')
    getByRole(@Param('role') role: string) {
        return this.roleService.getByRole(role);
    }

    @Get()
    getAll() {
        return this.roleService.getAll();
    }
}
