import { City, Offer} from './offer-data';
import { RequestStatus } from '../const';

export type OffersData = {
  offers: Offers;
  fetchingStatusOffers: RequestStatus;
  city: City;
}

export type Offers = Offer[];
