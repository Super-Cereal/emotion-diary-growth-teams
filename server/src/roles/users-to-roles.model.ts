import {
    Column,
    Table,
    DataType,
    Model,
    ForeignKey,
} from 'sequelize-typescript';
import { UserModel } from '../users/users.model';
import { RoleModel } from './roles.model';

@Table({ tableName: 'users_to_roles', createdAt: false, updatedAt: false })
export class UsersToRolesModel extends Model<UsersToRolesModel> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
    })
    id: number;

    @ForeignKey(() => UserModel)
    @Column({ type: DataType.NUMBER })
    userId: string;

    @ForeignKey(() => RoleModel)
    @Column({ type: DataType.NUMBER })
    roleId: string;
}
