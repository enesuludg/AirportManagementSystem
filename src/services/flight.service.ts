import DB from '@databases';
import { CreateFlightDto, FlightByStatustDto, FlightStatustDto } from '@dtos/flight.dto';
import { HttpException } from '@exceptions/HttpException';
import { Flight, STATUS } from '@interfaces/flight.interface';
import { isEmpty } from '@utils/util';
import { Op } from 'sequelize';

class FlightService {
  public flight = DB.Flight;

  public async findAllFlight(): Promise<Flight[]> {
    const allFlight: Flight[] = await this.flight.findAll({ where: { isDelete: false } });
    return allFlight;
  }

  public async findFlightById(flightId: number): Promise<Flight> {
    if (isEmpty(flightId)) throw new HttpException(400, 'flightId is empty');

    const findFlight: Flight = await this.flight.findOne({ where: { id: flightId, isDelete: false } });
    if (!findFlight) throw new HttpException(409, "Flight doesn't exist");

    return findFlight;
  }

  public async createFlight(flightData: CreateFlightDto): Promise<Flight> {
    if (isEmpty(flightData)) throw new HttpException(400, 'flightData is empty');
    flightData.status = STATUS.PENDING;
    const createflightData: Flight = await this.flight.create(flightData);
    return createflightData;
  }

  public async updateFlight(flightId: number, flightData: CreateFlightDto): Promise<Flight> {
    if (isEmpty(flightData)) throw new HttpException(400, 'flightData is empty');

    const findFlight: Flight = await this.flight.findOne({ where: { id: flightId, isDelete: false } });
    if (!findFlight) throw new HttpException(409, "Flight doesn't exist");

    await this.flight.update({ ...flightData }, { where: { id: flightId } });

    const updateFlight: Flight = await this.flight.findByPk(flightId);
    return updateFlight;
  }

  public async deleteFlight(flightId: number): Promise<Flight> {
    if (isEmpty(flightId)) throw new HttpException(400, "Flight doesn't exist Id");

    const findFlight: Flight = await this.flight.findByPk(flightId);
    if (!findFlight) throw new HttpException(409, "Flight doesn't exist");
    await this.flight.update({ isDelete: true }, { where: { id: flightId } });
    //await this.flight.destroy({ where: { id: flightId } });
    return findFlight;
  }
  public async findFlightByStatus(flightData: FlightByStatustDto): Promise<Flight[]> {
    if (isEmpty(flightData)) throw new HttpException(400, 'flightData is empty');
    const params =
      isEmpty(flightData.airCompany) === true ? { status: flightData.status } : { status: flightData.status, airCompany: flightData.airCompany };

    const allFlight: Flight[] = await this.flight.findAll({
      where: { ...params, isDelete: false },
    });
    return allFlight;
  }
  public async findActiveFlight(): Promise<Flight[]> {
    /* const start = new Date();
    start.getDate() - 1;
    const end = new Date(); */
    const allFlight: Flight[] = await this.flight.findAll({
      where: {
        status: STATUS.ACTIVE,
        isDelete: false,
        updatedAt: {
          //[Op.between]: [start, end],
          [Op.lt]: new Date(),
          [Op.gt]: new Date().getDate() - 1,
        },
      },
    });
    return allFlight;
  }
  public async changeFlightStatus(flightData: FlightStatustDto): Promise<Flight> {
    if (isEmpty(flightData)) throw new HttpException(400, 'flightData is empty');
    const findFlight: Flight = await this.flight.findOne({ where: { id: flightData.flightId, isDelete: false } });
    if (!findFlight) throw new HttpException(409, "Flight doesn't exist");
    switch (flightData.status) {
      case STATUS.DELAYED:
        await this.flight.update({ delayStartedAt: new Date(), status: STATUS.DELAYED }, { where: { id: flightData.flightId } });
        break;
      case STATUS.ACTIVE:
        await this.flight.update({ startedAt: new Date(), status: STATUS.ACTIVE }, { where: { id: flightData.flightId } });
        break;
      case STATUS.COMPLETED:
        await this.flight.update({ endAt: new Date(), status: STATUS.COMPLETED }, { where: { id: flightData.flightId } });
        break;
      default:
        break;
    }
    const updateFlight: Flight = await this.flight.findByPk(flightData.flightId);
    return updateFlight;
  }
  public async findAllCOMPLETEDFlight(): Promise<Flight[]> {
    const allFlight: Flight[] = await this.flight.findAll({ where: { status: STATUS.COMPLETED, isDelete: false } });
    const newList: Flight[] = [];
    allFlight.forEach(flight => {
      const diffTime = new Date(flight.endAt).valueOf() - new Date(flight.startedAt).valueOf();
      if (flight.estimatedFlightTime < diffTime) {
        newList.push(flight);
      }
    });
    return newList;
  }
}
export default FlightService;
