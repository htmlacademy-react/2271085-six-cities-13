import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../types/types';

export const changeCity = createAction<string>('changeCity');

export const setOffers = createAction<Offer[]>('setOffers');

export const sortedOffersCity = createAction<string>('sortedOffersCity');
