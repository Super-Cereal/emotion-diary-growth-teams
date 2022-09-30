import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ example: 'user@mail.ru' })
    readonly email: string;

    @ApiProperty({ example: 'qwerty12' })
    readonly password: string;
}
