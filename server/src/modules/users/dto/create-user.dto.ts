import { ApiProperty } from '@nestjs/swagger';
import {IsEmail, IsString, Length} from "class-validator";

export class CreateUserDto {
    @ApiProperty({ example: 'user@mail.ru' })
    @IsString()
    @IsEmail()
    readonly email: string;

    @ApiProperty({ example: 'qwerty12' })
    @IsString()
    @Length(4, 16)
    readonly password: string;
}
