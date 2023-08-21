import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state.js';
import { Offers, Offer, AuthData, DetailedOffer, Comments, Comment, ReviewData } from '../types/types.js';
import { loadOffer, setDetailedOfferDataLoadingStatus, redirectToRoute, loadReviews, addReview, loadOffersNearby} from './action';
import {APIRoute, AppRoute, NameSpace } from '../const';
import { dropToken, saveToken } from '../services/token';
import { AuthorizedUser } from '../types/user-data.js';

export const fetchOffersAction = createAsyncThunk<Offers, undefined,{
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${NameSpace.Offers}/fetchOffers`,
  async (_arg, { extra: api}) => {
    const { data } = await api.get<Offers>(APIRoute.Offers);
    console.log('fetchOffers', data);
    return data;
  }
);

export const fetchOfferAction = createAsyncThunk<void, string,{
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffer',
  async (id, {dispatch, extra: api}) => {
    dispatch(setDetailedOfferDataLoadingStatus(true));
    const {data: dataOffer} = await api.get<DetailedOffer>(`${APIRoute.Offers}/${id}`);
    const {data: dataReviews} = await api.get<Comments>(`${APIRoute.Comments}/${id}`);
    const {data: dataOfferNearby} = await api.get<Offers>(`${APIRoute.Offers}/${id}/nearby`);

    dispatch(loadOffer(dataOffer));
    dispatch(loadReviews(dataReviews));
    dispatch(loadOffersNearby(dataOfferNearby));
    dispatch(setDetailedOfferDataLoadingStatus(false));
  }
);

export const postReview = createAsyncThunk<void, {reviewData: ReviewData; id: Offer['id']},{
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offer/postReview',
  async ({reviewData, id}, {dispatch, extra:api}) => {
    const {data} = await api.post<Comment>(`${APIRoute.Comments}/${id}`, reviewData);
    dispatch(addReview(data));
  }
);

export const checkAuthAction = createAsyncThunk<AuthorizedUser, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${NameSpace.User}/checkAuth`,
  async (_arg, { extra: api }) => {
    const { data } = await api.get<AuthorizedUser>(APIRoute.Login);
    return data;
  },
);

export const loginAction = createAsyncThunk<AuthorizedUser, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${NameSpace.User}/login`,
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data, status} = await api.post<AuthorizedUser>(APIRoute.Login, {email, password});

    if (status >= 200 && status < 300){
      saveToken(data.token);
      dispatch(redirectToRoute(AppRoute.Main));
    }
    return data;
  },

);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${NameSpace.User}/logout`,
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(redirectToRoute(AppRoute.Login));
  },
);
