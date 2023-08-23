import { Offer } from './types/offer-data';
import { Offers } from './types/offers-data';

export const sorting: Record<string, (offers: Offers) => Offers> = {
  popular: (offers: Offers) => offers.slice(),
  high: (offers: Offers) => offers.slice().sort((a: Offer, b: Offer) => a.price - b.price),
  low: (offers: Offers) => offers.slice().sort((a: Offer, b: Offer) => b.price - a.price),
  top: (offers: Offers) => offers.slice().sort((a: Offer, b: Offer) => b.rating - a.rating),
};
