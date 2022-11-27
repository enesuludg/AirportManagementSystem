import { Router } from 'express';
import AirplaneController from '@controllers/airplane.controller';
import { CreateAirplaneDto, MoveAirplaneDto } from '@dtos/airplane.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class AirplanesRoute implements Routes {
  public path = '/airplane';
  public router = Router();
  public airplaneController = new AirplaneController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.airplaneController.getAirplanes);
    this.router.get(`${this.path}/:id(\\d+)`, this.airplaneController.getAirplaneById);
    this.router.post(`${this.path}`, validationMiddleware(CreateAirplaneDto, 'body'), this.airplaneController.createAirplane);
    this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(CreateAirplaneDto, 'body', true), this.airplaneController.updateAirplane);
    this.router.delete(`${this.path}/:id(\\d+)`, this.airplaneController.deleteAirplane);
    this.router.put(`${this.path}/move/:id(\\d+)`, validationMiddleware(MoveAirplaneDto, 'body', true), this.airplaneController.updateAirplane);
  }
}

export default AirplanesRoute;
