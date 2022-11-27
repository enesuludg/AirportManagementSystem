import DB from '@databases';
import { CreateAirplaneDto } from '@dtos/aircompany.dto';
import { HttpException } from '@exceptions/HttpException';
import { Aircompany } from '@interfaces/aircompany.interface';
import { isEmpty } from '@utils/util';

class AircompanyService {
  public aircompany = DB.Aircompany;

  public async findAllAircompany(): Promise<Aircompany[]> {
    const allUser: Aircompany[] = await this.aircompany.findAll({ where: { isDelete: false } });
    return allUser;
  }

  public async findAircompanyById(aircompanyId: number): Promise<Aircompany> {
    if (isEmpty(aircompanyId)) throw new HttpException(400, 'aircompanyId is empty');

    const findUser: Aircompany = await this.aircompany.findOne({ where: { id: aircompanyId, isDelete: false } });
    if (!findUser) throw new HttpException(409, "aircompany doesn't exist");

    return findUser;
  }

  public async createAircompany(aircompanyData: CreateAirplaneDto): Promise<Aircompany> {
    if (isEmpty(aircompanyData)) throw new HttpException(400, 'aircompanyData is empty');

    const findUser: Aircompany = await this.aircompany.findOne({ where: { name: aircompanyData.name } });
    if (findUser) throw new HttpException(409, `This company ${aircompanyData.name} already exists`);
    const createUserData: Aircompany = await this.aircompany.create(aircompanyData);
    return createUserData;
  }

  public async updateAircompany(aircompanyId: number, aircompanyData: CreateAirplaneDto): Promise<Aircompany> {
    if (isEmpty(aircompanyData)) throw new HttpException(400, 'aircompanyData is empty');

    const findAircompany: Aircompany = await this.aircompany.findByPk(aircompanyId);
    if (!findAircompany) throw new HttpException(409, "aircompany doesn't exist");

    await this.aircompany.update(aircompanyData, { where: { id: aircompanyId } });

    const updateUser: Aircompany = await this.aircompany.findByPk(aircompanyId);
    return updateUser;
  }

  public async deleteAircompany(aircompanyId: number): Promise<Aircompany> {
    if (isEmpty(aircompanyId)) throw new HttpException(400, "aircompanyId doesn't existId");

    const findAircompany: Aircompany = await this.aircompany.findByPk(aircompanyId);
    if (!findAircompany) throw new HttpException(409, "aircompanyId doesn't exist");
    await this.aircompany.update({ isDelete: true }, { where: { id: aircompanyId } });
    //await this.aircompany.destroy({ where: { id: aircompanyId } });

    return findAircompany;
  }
}

export default AircompanyService;
