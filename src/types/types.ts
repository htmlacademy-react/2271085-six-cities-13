import { User } from './user-data';

type Comment = {
  id: string;
  comment: string;
  date: string;
  rating: number;
  user: User;
}

type ReviewData = {
  rating: number;
  comment: string;
}


type Comments = Comment[];

export type { ReviewData,Comment, Comments,};
