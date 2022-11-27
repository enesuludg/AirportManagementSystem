import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Flight, STATUS } from '@interfaces/flight.interface';

export type FlightCreationAttributes = Optional<
  Flight,
  | 'id'
  | 'status'
  | 'airCompany'
  | 'airPlane'
  | 'departureCountry'
  | 'destinationCountry'
  | 'distance'
  | 'estimatedFlightTime'
  | 'startedAt'
  | 'endAt'
  | 'delayStartedAt'
  | 'isDelete'
  | 'updatedAt'
  | 'createdAt'
>;

export class FlightModel extends Model<Flight> implements Flight {
  public id: number;
  public status: string;
  public airCompany: number;
  public airPlane: number;
  public departureCountry: string;
  public destinationCountry: string;
  public distance: string;
  public estimatedFlightTime: number;
  public startedAt: Date;
  public endAt: Date;
  public delayStartedAt: Date;
  public createdAt!: Date;
  public updatedAt!: Date;
  public isDelete: boolean;
}

export default function (sequelize: Sequelize): typeof FlightModel {
  FlightModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      status: {
        allowNull: false,
        type: DataTypes.ENUM(STATUS.PENDING, STATUS.ACTIVE, STATUS.COMPLETED, STATUS.DELAYED),
        defaultValue: STATUS.PENDING,
      },
      airCompany: {
        allowNull: true,
        type: DataTypes.INTEGER,
        references: {
          model: 'aircompany',
          key: 'id',
        },
      },
      airPlane: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'airplane',
          key: 'id',
        },
      },
      departureCountry: {
        allowNull: true,
        type: DataTypes.STRING(255),
      },
      destinationCountry: {
        allowNull: true,
        type: DataTypes.STRING(255),
      },
      distance: {
        allowNull: true,
        type: DataTypes.STRING(255),
      },
      estimatedFlightTime: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      startedAt: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      endAt: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      delayStartedAt: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      isDelete: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        get() {
          delete this.isDelete;
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      },
    },
    {
      tableName: 'flight',
      sequelize,
      timestamps: false,
      hooks: {
        afterCreate: record => {
          record.createdAt = new Date();
          record.updatedAt = new Date();
        },
        afterUpdate: record => {
          record.updatedAt = new Date();
        },
      },
    },
  );

  return FlightModel;
}
