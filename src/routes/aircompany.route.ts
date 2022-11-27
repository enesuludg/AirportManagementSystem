import { Router } from 'express';
import AircompanyController from '@controllers/aircompany.controller';
import { CreateAirplaneDto } from '@dtos/aircompany.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class AircompanysRoute implements Routes {
  public path = '/aircompany';
  public router = Router();
  public aircompanyController = new AircompanyController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.aircompanyController.getAircompanys);
    this.router.get(`${this.path}/:id(\\d+)`, this.aircompanyController.getAircompanyById);
    this.router.post(`${this.path}`, validationMiddleware(CreateAirplaneDto, 'body'), this.aircompanyController.createAircompany);
    this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(CreateAirplaneDto, 'body', true), this.aircompanyController.updateAircompany);
    this.router.delete(`${this.path}/:id(\\d+)`, this.aircompanyController.deleteAircompany);
  }
}

export default AircompanysRoute;
