import { NextFunction, Request, Response } from 'express';
import { CreateFlightDto, FlightByStatustDto, FlightStatustDto } from '@dtos/flight.dto';
import { Flight } from '@interfaces/flight.interface';
import FlightService from '@services/flight.service';

class FlightController {
  public flightService = new FlightService();

  public getFlights = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllFlightsData: Flight[] = await this.flightService.findAllFlight();

      res.status(200).json({ data: findAllFlightsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getFlightById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const flightId = Number(req.params.id);
      const findOneFlightData: Flight = await this.flightService.findFlightById(flightId);

      res.status(200).json({ data: findOneFlightData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createFlight = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const flightData: CreateFlightDto = req.body;
      const createFlightData: Flight = await this.flightService.createFlight(flightData);

      res.status(201).json({ data: createFlightData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateFlight = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const flightId = Number(req.params.id);
      const flightData: CreateFlightDto = req.body;
      const updateFlightData: Flight = await this.flightService.updateFlight(flightId, flightData);

      res.status(200).json({ data: updateFlightData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteFlight = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const flightId = Number(req.params.id);
      const deleteFlightData: Flight = await this.flightService.deleteFlight(flightId);

      res.status(200).json({ data: deleteFlightData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
  public findFlightByStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const flightData: FlightByStatustDto = req.body;
      const updateFlightData: Flight[] = await this.flightService.findFlightByStatus(flightData);

      res.status(200).json({ data: updateFlightData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };
  public findActiveFlight = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllFlightsData: Flight[] = await this.flightService.findActiveFlight();

      res.status(200).json({ data: findAllFlightsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };
  public changeFlightStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const flightData: FlightStatustDto = req.body;
      const deleteFlightData: Flight = await this.flightService.changeFlightStatus(flightData);

      res.status(200).json({ data: deleteFlightData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };
  public findAllCOMPLETEDFlight = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllFlightsData: Flight[] = await this.flightService.findAllCOMPLETEDFlight();

      res.status(200).json({ data: findAllFlightsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };
}

export default FlightController;
