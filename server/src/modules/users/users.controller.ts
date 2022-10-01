import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserModel } from './users.model';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @ApiOperation({ summary: 'Создание пользователя' })
    @ApiResponse({ status: 200, type: UserModel })
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.userService.createUser(userDto);
    }

    @ApiOperation({ summary: 'Получение пользователя по имени' })
    @ApiResponse({ status: 200, type: [UserModel] })
    @Get('/:name')
    getByName(@Param('name') name: string) {
        return this.userService.getUserByName(name);
    }

    @ApiOperation({ summary: 'Получение всех пользователей' })
    @ApiResponse({ status: 200, type: [UserModel] })
    @Get()
    getAll() {
        return this.userService.getAllUsers();
    }
}
