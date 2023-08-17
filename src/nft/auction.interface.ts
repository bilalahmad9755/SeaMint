import { IBid } from './bid.interface';
export interface IAuction {
  startTime: string;
  endTime: string;
  status: string;
  price: string;
  bid: IBid[];
}
