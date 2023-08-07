export const enum Settings{
  Offers = 10,
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
];

export const months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


const ASSETS_BASE_UPL = 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/';

export const URL_MARKER_DEFAULT =
  `${ASSETS_BASE_UPL}/pin.svg`;

export const URL_MARKER_CURRENT =
  `${ASSETS_BASE_UPL}/main-pin.svg`;


export {Stars};
