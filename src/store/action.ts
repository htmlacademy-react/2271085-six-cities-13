import { createAction } from '@reduxjs/toolkit';
import { Offer, DetailedOffer, Comments, Comment } from '../types/types';
import { AppRoute } from '../const';


export const sortedOffersCity = createAction<string>('sortedOffersCity');

export const filterOffers = createAction<string>('filterOffers');

export const loadOffers = createAction<Offer[]>('data/loadOffers');

export const loadOffer = createAction<DetailedOffer>('data/loadOffer');

export const loadReviews = createAction<Comments>('data/loadReviews');

export const loadOffersNearby = createAction<Offer[]>('data/loadOffersNearby');

export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');

export const setDetailedOfferDataLoadingStatus = createAction<boolean>('data/setDetailedOfferDataLoadingStatus');

export const redirectToRoute = createAction<AppRoute>('app/redirectToRoute');

export const addReview = createAction<Comment>('review/addReview');

export const dropSendingStatus = createAction('review/dropSendingStatus');
