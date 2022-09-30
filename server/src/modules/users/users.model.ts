import {
    Model,
    Table,
    Column,
    DataType,
    BelongsToMany,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { RoleModel } from '../roles/roles.model';
import { UsersToRolesModel } from './users-to-roles.model';

interface CreationAttrs {
    email: string;
    password: string;
}

@Table({ tableName: 'users' })
export class UserModel extends Model<UserModel, CreationAttrs> {
    @ApiProperty({ example: 1, description: 'Айди' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({ example: 'user@mail.ru', description: 'Почта' })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string;

    @ApiProperty({ example: 'qwerty12', description: 'Пароль' })
    @Column({ type: DataType.STRING, allowNull: false })
    password: string;

    @ApiProperty({ example: true })
    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    banned: boolean;

    @ApiProperty({ example: 'плохое поведение' })
    @Column({ type: DataType.STRING, allowNull: true })
    banReason: string;

    @BelongsToMany(() => RoleModel, () => UsersToRolesModel)
    roles: RoleModel[];
}
