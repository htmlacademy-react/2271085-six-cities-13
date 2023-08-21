import { Offers, Offer } from './types/types';

export const sorting: Record<string, (offers: Offers) => Offers> = {
  popular: (offers: Offers) => offers.slice(),
  high: (offers: Offers) => offers.slice().sort((a: Offer, b: Offer) => a.price - b.price),
  low: (offers: Offers) => offers.slice().sort((a: Offer, b: Offer) => b.price - a.price),
  top: (offers: Offers) => offers.slice().sort((a: Offer, b: Offer) => b.rating - a.rating),
};
