export interface Flight {
  id: number;
  status: string;
  airCompany: number;
  airPlane: number;
  departureCountry: string;
  destinationCountry: string;
  distance: string;
  estimatedFlightTime: number;
  startedAt: Date;
  endAt: Date;
  delayStartedAt: Date;
  isDelete: boolean;
  updatedAt: Date;
  createdAt: Date;
}

export enum STATUS {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  DELAYED = 'DELAYED',
  PENDING = 'PENDING',
}
