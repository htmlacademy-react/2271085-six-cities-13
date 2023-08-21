import { Offers, City, } from './types';
import { RequestStatus } from '../const';

export type OffersData = {
  offers: Offers;
  filterOffers: Offers;
  fetchingStatusOffers: RequestStatus;
  city: City;
}
