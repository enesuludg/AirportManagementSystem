import Sequelize from 'sequelize';
import { NODE_ENV, PG_PORT, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB } from '@config';
import AircompanyModel from '@models/aircompany.model';
import AirplaneModel from '@models/airplane.model';
import FlightModel from '@models/flight.model';

import { logger } from '@utils/logger';

const sequelize = new Sequelize.Sequelize(POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, {
  dialect: 'postgres',
  host: 'pg',
  port: Number(PG_PORT),
  timezone: '+09:00',
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    underscored: true,
    freezeTableName: true,
  },
  pool: {
    min: 0,
    max: 5,
  },
  logQueryParameters: NODE_ENV === 'development',
  logging: (query, time) => {
    logger.info(time + 'ms' + ' ' + query);
  },
  benchmark: true,
});

sequelize.authenticate();

const DB = {
  Aircompany: AircompanyModel(sequelize),
  Airplane: AirplaneModel(sequelize),
  Flight: FlightModel(sequelize),
  sequelize, // connection instance (RAW queries)
  Sequelize, // library
};

export default DB;
