import { Offers } from './offers-data';
import { RequestStatus } from '../const';

export type FavoritesData = {
  favorites: Offers;
  fetchingStatusFavorites: RequestStatus;
};
