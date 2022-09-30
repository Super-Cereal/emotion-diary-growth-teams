import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
    @ApiProperty({ example: 'content-maker' })
    readonly role: string;

    @ApiProperty({ example: 'Может писать посты от имени группы' })
    readonly description: string;
}
