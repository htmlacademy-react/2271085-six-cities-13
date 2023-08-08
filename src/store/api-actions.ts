import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state.js';
import { Offers } from '../types/types.js';
import {loadOffers, sortedOffersCity, setOffersDataLoadingStatus} from './action';
import {APIRoute} from '../const';

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

