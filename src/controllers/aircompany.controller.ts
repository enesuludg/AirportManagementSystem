import { NextFunction, Request, Response } from 'express';
import { CreateAirplaneDto } from '@dtos/aircompany.dto';
import { Aircompany } from '@interfaces/aircompany.interface';
import AircompanyService from '@services/aircompany.service';

class AircompanyController {
  public aircompanyService = new AircompanyService();

  public getAircompanys = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllAircompanysData: Aircompany[] = await this.aircompanyService.findAllAircompany();

      res.status(200).json({ data: findAllAircompanysData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getAircompanyById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const aircompanyId = Number(req.params.id);
      const findOneAircompanyData: Aircompany = await this.aircompanyService.findAircompanyById(aircompanyId);

      res.status(200).json({ data: findOneAircompanyData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createAircompany = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const aircompanyData: CreateAirplaneDto = req.body;
      const createAircompanyData: Aircompany = await this.aircompanyService.createAircompany(aircompanyData);

      res.status(201).json({ data: createAircompanyData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateAircompany = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const aircompanyId = Number(req.params.id);
      const aircompanyData: CreateAirplaneDto = req.body;
      const updateAircompanyData: Aircompany = await this.aircompanyService.updateAircompany(aircompanyId, aircompanyData);

      res.status(200).json({ data: updateAircompanyData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteAircompany = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const aircompanyId = Number(req.params.id);
      const deleteAircompanyData: Aircompany = await this.aircompanyService.deleteAircompany(aircompanyId);

      res.status(200).json({ data: deleteAircompanyData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default AircompanyController;
