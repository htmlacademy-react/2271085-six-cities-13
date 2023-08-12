import { createAction } from '@reduxjs/toolkit';
import { Offer, DetailedOffer, Comments } from '../types/types';
import { AuthorizationStatus, AppRoute } from '../const';

export const changeCity = createAction<string>('changeCity');

export const sortedOffersCity = createAction<string>('sortedOffersCity');

export const filterOffers = createAction<string>('filterOffers');

export const loadOffers = createAction<Offer[]>('data/loadOffers');

export const loadOffer = createAction<DetailedOffer>('data/loadOffer');

export const loadReviews = createAction<Comments>('data/loadReviews');

export const loadOffersNearby = createAction<Offer[]>('data/loadOffersNearby');

export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const redirectToRoute = createAction<AppRoute>('app/redirectToRoute');
