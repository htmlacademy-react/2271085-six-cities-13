import { Offer, City } from './types/offer-data';
import { Offers } from './types/offers-data';

export const sorting: Record<string, (offers: Offers) => Offers> = {
  popular: (offers: Offers) => offers.slice(),
  high: (offers: Offers) => offers.slice().sort((a: Offer, b: Offer) => a.price - b.price),
  low: (offers: Offers) => offers.slice().sort((a: Offer, b: Offer) => b.price - a.price),
  top: (offers: Offers) => offers.slice().sort((a: Offer, b: Offer) => b.rating - a.rating),
};

export const capitalizedString = (string: string) =>
  `${string.charAt(0).toUpperCase()}${string.slice(1)}`;

export const getRandomCity = (obj: Record<string, City>) => {
  const keys = Object.keys(obj);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  return obj[randomKey];
};
