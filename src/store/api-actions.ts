import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state.js';
import { Offers, AuthData, UserData, DetailedOffer, Comments } from '../types/types.js';
import {loadOffers, loadOffer, sortedOffersCity, setOffersDataLoadingStatus, requireAuthorization, redirectToRoute, loadReviews, loadOffersNearby} from './action';
import {APIRoute, AppRoute, AuthorizationStatus } from '../const';
import { dropToken, saveToken } from '../services/token';

export const fetchOffersAction = createAsyncThunk<void, undefined,{
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, getState, extra: api}) => {
    dispatch(setOffersDataLoadingStatus(true));
    const {city} = getState();
    const {data} = await api.get<Offers>(APIRoute.Offers);
    dispatch(setOffersDataLoadingStatus(false));
    dispatch(loadOffers(data));
    dispatch(sortedOffersCity(city));
  }
);

export const fetchOfferAction = createAsyncThunk<void, string,{
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffer',
  async (id, {dispatch, extra: api}) => {
    dispatch(setOffersDataLoadingStatus(true));
    const {data: dataOffer} = await api.get<DetailedOffer>(`${APIRoute.Offers}/${id}`);
    console.log(dataOffer);
    const {data: dataReviews} = await api.get<Comments>(`${APIRoute.Comments}/${id}`);
    const {data: dataOfferNearby} = await api.get<Offers>(`${APIRoute.Offers}/${id}/nearby`);
    dispatch(setOffersDataLoadingStatus(false));
    dispatch(loadOffer(dataOffer));
    dispatch(loadReviews(dataReviews));
    dispatch(loadOffersNearby(dataOfferNearby));
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Main));
  },

);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);