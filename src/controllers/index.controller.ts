import { NextFunction, Request, Response } from 'express';

class IndexController {
  public index = (req: Request, res: Response, next: NextFunction) => {
    try {
      const healthcheck = {
        uptime: process.uptime(),
        message: 'OK',
        timestamp: Date.now(),
      };
      res.status(200).json(healthcheck);
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;
