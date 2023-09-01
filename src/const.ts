import { City } from './types/offer-data';

export const MAX_REVIEWS_COUNT = 10;

export const MAX_RENDER_OFFER_IMAGES_COUNT = 6;

export const RENDER_NEARBY_OFFERS = 3;

export const enum Settings{
  Offers = 10,
}

export const enum CommentLength {
  Min = 50,
  Max = 300,
}

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum APIRoute{
  Login = '/login',
  Logout = '/logout',
  Offers = '/offers',
  Favorite = '/favorite',
  Comments = '/comments',
}

const Stars = [
  'terribly',
  'badly',
  'not bad',
  'good',
  'perfect',
] as const;

export const CitiesList = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf'
] as const;

export type TCity = typeof CitiesList[number];

export const CityMap: Record<TCity, City> = {
  'Paris': {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13
    }
  },
  'Cologne': {
    name: 'Cologne',
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
      zoom: 13
    }
  },
  'Brussels': {
    name: 'Brussels',
    location: {
      latitude: 50.846557,
      longitude: 4.351697,
      zoom: 13
    }
  },
  'Amsterdam': {
    name: 'Amsterdam',
    location: {
      latitude: 52.37454,
      longitude: 4.897976,
      zoom: 13
    }
  },
  'Hamburg': {
    name: 'Hamburg',
    location: {
      latitude: 53.550341,
      longitude: 10.000654,
      zoom: 13
    }
  },
  'Dusseldorf': {
    name: 'Dusseldorf',
    location: {
      latitude: 51.225402,
      longitude: 6.776314,
      zoom: 13
    }
  },
} as const;

export const enum RequestStatus {
  Unsent = 'UNSENT',
  Pending = 'PENDING',
  Success = 'SUCCESS',
  Error = 'ERROR'
}

export const enum FetchingNameSpace {
  Offers = 'OFFERS',
  Offer = 'OFFER',
  Reviews = 'REVIEWS',
  OffersNearby = 'OFFERS_NEARBY',
  Favorites = 'FAVORITES',
  User = 'USER'
}

export const enum FavoriteStatus {
  Add = 1,
  Delete = 0
}

export const months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


const ASSETS_BASE_UPL = '/img';

export const URL_MARKER_DEFAULT =
  `${ASSETS_BASE_UPL}/pin.svg`;

export const URL_MARKER_CURRENT =
  `${ASSETS_BASE_UPL}/pin-active.svg`;


export {Stars};
