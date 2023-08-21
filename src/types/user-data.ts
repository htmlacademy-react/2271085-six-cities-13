import { AuthorizationStatus, RequestStatus } from '../const';

export type AuthorizedUser = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
  email: string;
  token: string;
}

export type User = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

export type AuthData = {
  login: string;
  password: string;
}

export type UserData = {
  user: AuthorizedUser | null;
  authorizationStatus: AuthorizationStatus;
  sendingStatusLogin: RequestStatus;
}
