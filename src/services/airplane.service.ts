import DB from '@databases';
import { CreateAirplaneDto, MoveAirplaneDto } from '@dtos/airplane.dto';
import { HttpException } from '@exceptions/HttpException';
import { Airplane } from '@/interfaces/airplane.interface';
import { isEmpty } from '@utils/util';

class AirplaneService {
  public airplane = DB.Airplane;

  public async findAllAirplane(): Promise<Airplane[]> {
    const allUser: Airplane[] = await this.airplane.findAll({ where: { isDelete: false } });
    return allUser;
  }

  public async findAirplaneById(airplaneId: number): Promise<Airplane> {
    if (isEmpty(airplaneId)) throw new HttpException(400, 'Airplane is empty');

    const findUser: Airplane = await this.airplane.findOne({ where: { id: airplaneId, isDelete: false } });
    if (!findUser) throw new HttpException(409, "Airplane doesn't exist");

    return findUser;
  }

  public async createAirplane(airplaneData: CreateAirplaneDto): Promise<Airplane> {
    if (isEmpty(airplaneData)) throw new HttpException(400, 'airplaneData is empty');

    const findUser: Airplane = await this.airplane.findOne({ where: { factorySerialNumber: airplaneData.factorySerialNumber } });
    if (findUser) throw new HttpException(409, `This factorySerialNumber ${airplaneData.factorySerialNumber} already exists`);

    const createUserData: Airplane = await this.airplane.create(airplaneData);
    return createUserData;
  }

  public async updateAirplane(airplaneId: number, airplaneData: CreateAirplaneDto): Promise<Airplane> {
    if (isEmpty(airplaneData)) throw new HttpException(400, 'airplaneData is empty');

    const findUser: Airplane = await this.airplane.findOne({ where: { id: airplaneId, isDelete: false } });
    if (!findUser) throw new HttpException(409, "airplane doesn't exist");

    await this.airplane.update({ ...airplaneData }, { where: { id: airplaneId } });

    const updateUser: Airplane = await this.airplane.findByPk(airplaneId);
    return updateUser;
  }

  public async deleteAirplane(airplaneId: number): Promise<Airplane> {
    if (isEmpty(airplaneId)) throw new HttpException(400, "airplane doesn't existId");

    const findUser: Airplane = await this.airplane.findByPk(airplaneId);
    if (!findUser) throw new HttpException(409, "Airplane doesn't exist");
    await this.airplane.update({ isDelete: true }, { where: { id: airplaneId } });
    //await this.airplane.destroy({ where: { id: airplaneId } });

    return findUser;
  }
  public async moveAirplane(airplaneId: number, airplaneData: MoveAirplaneDto): Promise<Airplane> {
    if (isEmpty(airplaneData)) throw new HttpException(400, 'airplaneData is empty');

    const findUser: Airplane = await this.airplane.findOne({ where: { id: airplaneId, isDelete: false } });
    if (!findUser) throw new HttpException(409, "airplane doesn't exist");

    await this.airplane.update({ airCompany: airplaneData.airCompany }, { where: { id: airplaneId } });

    const updateUser: Airplane = await this.airplane.findByPk(airplaneId);
    return updateUser;
  }
}

export default AirplaneService;
