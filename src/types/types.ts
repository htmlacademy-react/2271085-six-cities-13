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

type User = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

type AuthData = {
  login: string;
  password: string;
}

type UserData = {
  id: number;
  email: string;
  token: string;
};

type Offers = Offer[];

type DetailedOffers = DetailedOffer[];

type Comments = Comment[];

export type { Offers, Offer, DetailedOffer, DetailedOffers, Comment, Comments, City, AuthData, UserData};
