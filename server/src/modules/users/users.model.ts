import { Model, Table, Column, DataType, HasMany } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { ImagesModel } from '../images/images.model';
import { CreateUserDto } from './dto/create-user.dto';

@Table({ tableName: 'users' })
export class UserModel extends Model<UserModel, CreateUserDto> {
    // @ApiProperty({ example: 1, description: 'Айди' })
    // @Column({
    //     type: DataType.INTEGER,
    //     unique: true,
    //     autoIncrement: true,
    //     primaryKey: true,
    // })
    // id: number;

    @ApiProperty({ example: 'Egor Petrov', description: 'Имечко' })
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
        primaryKey: true,
    })
    name: string;

    @HasMany(() => ImagesModel)
    images: ImagesModel[];
}
