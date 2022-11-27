import { Router } from 'express';
import FlightController from '@controllers/flight.controller';
import { CreateFlightDto, FlightByStatustDto, FlightStatustDto } from '@dtos/flight.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class FlightsRoute implements Routes {
  public path = '/flight';
  public router = Router();
  public flightController = new FlightController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.flightController.getFlights);
    this.router.get(`${this.path}/:id(\\d+)`, this.flightController.getFlightById);
    this.router.post(`${this.path}`, validationMiddleware(CreateFlightDto, 'body'), this.flightController.createFlight);
    this.router.post(`${this.path}/status`, validationMiddleware(FlightByStatustDto, 'body'), this.flightController.findFlightByStatus);
    this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(CreateFlightDto, 'body', true), this.flightController.updateFlight);
    this.router.delete(`${this.path}/:id(\\d+)`, this.flightController.deleteFlight);
    this.router.get(`${this.path}/active`, this.flightController.findActiveFlight);
    this.router.post(`${this.path}/change_status`, validationMiddleware(FlightStatustDto, 'body'), this.flightController.changeFlightStatus);
    this.router.get(`${this.path}/completed`, this.flightController.findAllCOMPLETEDFlight);
  }
}

export default FlightsRoute;
