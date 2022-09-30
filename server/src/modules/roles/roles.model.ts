import {
    BelongsToMany,
    Column,
    Table,
    DataType,
    Model,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { UserModel } from '../users/users.model';
import { UsersToRolesModel } from './users-to-roles.model';

interface CreationAttrs {
    role: string;
    description: string;
}

@Table({ tableName: 'roles' })
export class RoleModel extends Model<RoleModel, CreationAttrs> {
    @ApiProperty({ example: 1 })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
    })
    id: number;

    @ApiProperty({ example: 'content-maker' })
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    role: string;

    @ApiProperty({ example: 'Может писать посты от имени группы' })
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    description: string;

    @BelongsToMany(() => UserModel, () => UsersToRolesModel)
    users: UserModel[];
}
