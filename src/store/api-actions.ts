import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state.js';
import { Offer, DetailedOffer} from '../types/offer-data.js';
import { AuthData } from '../types/user-data.js';
import { Offers } from '../types/offers-data.js';
import { Comment, ReviewData } from '../types/types.js';
import { redirectToRoute, addReview} from './action';
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

    return data;
  }
);

export const fetchOfferAction = createAsyncThunk<DetailedOffer, Offer['id'],{
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${NameSpace.Offers}/fetchOffer`,
  async (id, {extra: api}) => {
    const { data } = await api.get<DetailedOffer>(`${APIRoute.Offers}/${id}`);

    return data;
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
