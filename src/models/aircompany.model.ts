import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Aircompany } from '@interfaces/aircompany.interface';

export type AircompanyCreationAttributes = Optional<Aircompany, 'id' | 'name' | 'companyType' | 'companyType' | 'isDelete'>;

export class AircompanyModel extends Model<Aircompany, AircompanyCreationAttributes> implements Aircompany {
  public id: number;
  public name: string;
  public companyType: string;
  public foundedAt: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public isDelete: boolean;
}

export default function (sequelize: Sequelize): typeof AircompanyModel {
  AircompanyModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING(45),
      },
      companyType: {
        allowNull: true,
        type: DataTypes.STRING(255),
      },
      foundedAt: {
        allowNull: true,
        type: DataTypes.STRING(45),
      },
      isDelete: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        get() {
          delete this.isDelete;
        },
      },
    },
    {
      tableName: 'aircompany',
      sequelize,
    },
  );

  return AircompanyModel;
}
