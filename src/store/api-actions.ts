import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state.js';
import { Offer, DetailedOffer} from '../types/offer-data.js';
import { AuthData } from '../types/user-data.js';
import { Offers } from '../types/offers-data.js';
import { Comment, Comments, ReviewData } from '../types/types.js';
import { redirectToRoute} from './action';
import {APIRoute, AppRoute, FetchingNameSpace, FavoriteStatus } from '../const';
import { dropToken, saveToken } from '../services/token';
import { AuthorizedUser } from '../types/user-data.js';
import { clearFavorites } from './favorites-data/favorites-data.slice.js';


export const fetchOffersAction = createAsyncThunk<Offers, undefined,{
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${FetchingNameSpace.Offers}/fetchOffers`,
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
  `${FetchingNameSpace.Offers}/fetchOffer`,
  async (id, {extra: api}) => {
    const { data } = await api.get<DetailedOffer>(`${APIRoute.Offers}/${id}`);

    return data;
  }
);

export const fetchReviewsAction = createAsyncThunk<Comments, Offer['id'], {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${FetchingNameSpace.Reviews}/fetchReviews`,
  async (id, {extra: api}) => {
    const { data } = await api.get<Comments>(`${APIRoute.Comments}/${id}`);

    return data;
  }
);

export const postReview = createAsyncThunk<Comment, {reviewData: ReviewData; id: Offer['id']},{
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${FetchingNameSpace.Reviews}/postReview`,
  async ({reviewData, id}, { extra:api}) => {
    const {data} = await api.post<Comment>(`${APIRoute.Comments}/${id}`, reviewData);
    return data;
  }
);

export const fetchOfferNearbyAction = createAsyncThunk<Offers, Offer['id'], {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${FetchingNameSpace.OffersNearby}/fetchNearPlace`,
  async (id, {extra: api}) => {
    const {data} = await api.get<Offers>(`${APIRoute.Offers}/${id}/nearby`);
    return data;
  }
);

export const fetchFavoritesAction = createAsyncThunk<Offers, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${FetchingNameSpace.Favorites}/fetchFavorites`,
  async (_arg, {extra: api}) => {
    const { data } = await api.get<Offers>(APIRoute.Favorite);

    return data;
  }
);

export const addFavorite = createAsyncThunk<Offer, Offer['id'], {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${FetchingNameSpace.Favorites}/addFavorite`,
  async (id, {extra: api}) => {
    const { data } = await api.post<Offer>(`${APIRoute.Favorite}/${id}/${FavoriteStatus.Add}`);

    return data;
  }
);

export const deleteFavorite = createAsyncThunk<Offer, Offer['id'], {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${FetchingNameSpace.Favorites}/deleteFavorite`,
  async (id, {extra: api}) => {
    const { data } = await api.post<Offer>(`${APIRoute.Favorite}/${id}/${FavoriteStatus.Delete}`);

    return data;
  }
);

export const checkAuthAction = createAsyncThunk<AuthorizedUser, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${FetchingNameSpace.User}/checkAuth`,
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
  `${FetchingNameSpace.User}/login`,
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
  `${FetchingNameSpace.User}/logout`,
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(clearFavorites());
  },
);
