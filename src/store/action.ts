import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../types/types';
import { AuthorizationStatus, AppRoute } from '../const';

export const changeCity = createAction<string>('changeCity');

export const sortedOffersCity = createAction<string>('sortedOffersCity');

export const filterOffers = createAction<string>('filterOffers');

export const loadOffers = createAction<Offer[]>('data/loadOffers');

export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const redirectToRoute = createAction<AppRoute>('app/redirectToRoute');
