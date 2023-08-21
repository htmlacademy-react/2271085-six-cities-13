import { City, Offer} from './offer-data';
import { RequestStatus } from '../const';

export type OffersData = {
  offers: Offers;
  filterOffers: Offers;
  fetchingStatusOffers: RequestStatus;
  city: City;
}

type Offers = Offer[];
