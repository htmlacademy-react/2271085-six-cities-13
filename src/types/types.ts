import { User } from './user-data';

type Offer = {
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

type City = {
  name: string;
  location: Location;
}

type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
}

type DetailedOffer = {
  description: string;
  bedrooms: number;
  goods: string[];
  host: Host;
  images: string[];
  maxAdults: number;
} & Offer;

type Host = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

type Comment = {
  id: string;
  comment: string;
  date: string;
  rating: number;
  user: User;
}

type Review = {
  reviewData: ReviewData;
  id: string;
}

type ReviewData = {
  rating: number;
  comment: string;
}

type Offers = Offer[];

type DetailedOffers = DetailedOffer[];

type Comments = Comment[];

export type { Offers, Offer, Review, ReviewData, DetailedOffer, DetailedOffers, Comment, Comments, City, AuthData, UserData};
