import {
    Model,
    Table,
    Column,
    DataType,
    BelongsTo,
    ForeignKey,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

import { UserModel } from '../users/users.model';

@Table({ tableName: 'images' })
export class ImagesModel extends Model<ImagesModel> {
    @ApiProperty({ example: 1, description: 'Айди' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({ example: 'path/to/file.png' })
    @Column({ type: DataType.STRING, allowNull: false })
    path: string;

    @Column({ type: DataType.STRING, allowNull: false })
    mimetype: string;

    @ForeignKey(() => UserModel)
    @Column({ type: DataType.STRING })
    userName: string;

    @BelongsTo(() => UserModel)
    user: UserModel;
}