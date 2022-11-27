import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Airplane } from '@/interfaces/airplane.interface';

export type UserCreationAttributes = Optional<
  Airplane,
  'id' | 'name' | 'factorySerialNumber' | 'airCompany' | 'flightDistance' | 'fuelCapacity' | 'type' | 'isDelete'
>;

export class AirplaneModel extends Model<Airplane, UserCreationAttributes> implements Airplane {
  public id: number;
  public name: string;
  public factorySerialNumber: string;
  public airCompany: number;
  public flightDistance: string;
  public fuelCapacity: string;
  public type: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public isDelete: boolean;
}

export default function (sequelize: Sequelize): typeof AirplaneModel {
  AirplaneModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      factorySerialNumber: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING(255),
      },
      airCompany: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'aircompany',
          key: 'id',
        },
      },
      flightDistance: {
        allowNull: true,
        type: DataTypes.STRING(255),
      },
      fuelCapacity: {
        allowNull: true,
        type: DataTypes.STRING(45),
      },
      type: {
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
      tableName: 'airplane',
      sequelize,
    },
  );

  return AirplaneModel;
}
