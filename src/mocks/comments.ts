import { Comments } from '../types/types';

const comments: Comments = [
  {
    id: '1',
    date: '2019-05-08T14:13:58.569Z',
    user: {
      name: 'Oliver Conner',
      avatarUrl: 'https://url-to-image/image.png',
      isPro: false
    },
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    rating: 4
  },
  {
    id: '2',
    date: '2019-05-08T14:13:56.569Z',
    user: {
      name: 'John Dow',
      avatarUrl: 'https://url-to-image/image.png',
      isPro: true
    },
    comment: 'Beautiful',
    rating: 3
  },
  {
    id: '3',
    date: '2019-05-08T14:11:50.569Z',
    user: {
      name: 'Hanz Schineider',
      avatarUrl: 'https://url-to-image/image.png',
      isPro: false
    },
    comment: 'Wundervolle Aussicht aus dem Fenster',
    rating: 5
  }
];

export default comments;
