import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../types/types';

export const changeCity = createAction<string>('changeCity');

export const setOffers = createAction<Offer[]>('setOffers');

export const sortedOffersCity = createAction<string>('sortedOffersCity');

export const filterOffers = createAction<string>('filterOffers');

export const loadOffers = createAction<Offer[]>('data/loadOffers');

export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');
