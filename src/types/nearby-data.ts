import { Offers } from './offers-data';
import { RequestStatus } from '../const';

export type NearbyData = {
  nearby: Offers;
  fetchingStatusNearby: RequestStatus;
};
