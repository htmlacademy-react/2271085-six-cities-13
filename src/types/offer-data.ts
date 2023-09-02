import { RequestStatus } from '../const';

export type Offer = {
  id : string;
  title : string;
  type : string;
  price: number;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
}

export type City = {
  name: string;
  location: Location;
}

export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
}

export type DetailedOffer = {
  description: string;
  bedrooms: number;
  goods: string[];
  host: Host;
  images: string[];
  maxAdults: number;
} & Offer;

export type Host = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

export type OfferData = {
  offer: DetailedOffer | null;
  fetchingStatusOffer: RequestStatus;
}

