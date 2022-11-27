import { NextFunction, Request, Response } from 'express';
import { CreateAirplaneDto, MoveAirplaneDto } from '@dtos/airplane.dto';
import { Airplane } from '@/interfaces/airplane.interface';
import AirplaneService from '@services/airplane.service';

class AirplaneController {
  public airplaneService = new AirplaneService();

  public getAirplanes = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllAirplanesData: Airplane[] = await this.airplaneService.findAllAirplane();

      res.status(200).json({ data: findAllAirplanesData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getAirplaneById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const airplaneId = Number(req.params.id);
      const findOneAirplaneData: Airplane = await this.airplaneService.findAirplaneById(airplaneId);

      res.status(200).json({ data: findOneAirplaneData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createAirplane = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const airplaneData: CreateAirplaneDto = req.body;
      const createAirplaneData: Airplane = await this.airplaneService.createAirplane(airplaneData);

      res.status(201).json({ data: createAirplaneData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateAirplane = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const airplaneId = Number(req.params.id);
      const airplaneData: CreateAirplaneDto = req.body;
      const updateAirplaneData: Airplane = await this.airplaneService.updateAirplane(airplaneId, airplaneData);

      res.status(200).json({ data: updateAirplaneData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteAirplane = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const airplaneId = Number(req.params.id);
      const deleteAirplaneData: Airplane = await this.airplaneService.deleteAirplane(airplaneId);

      res.status(200).json({ data: deleteAirplaneData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
  public moveAirplane = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const airplaneId = Number(req.params.id);
      const airplaneData: MoveAirplaneDto = req.body;
      const updateAirplaneData: Airplane = await this.airplaneService.moveAirplane(airplaneId, airplaneData);

      res.status(200).json({ data: updateAirplaneData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };
}

export default AirplaneController;
