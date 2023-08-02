import { DetailedOffers } from '../types/types';
import offers from './offers';

const additionalInfo = [
  {
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    bedrooms: 3,
    goods: ['Heating', 'Kitchen', 'Cable TV', 'Washing machine', 'Coffee machine', 'Dishwasher'],
    host: {
      name: 'Angelina',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: true
    },
    images: [
      'img/apartment-01.jpg',
      'img/apartment-02.jpg',
      'img/room.jpg',
    ],
    maxAdults: 4
  },
  {
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    bedrooms: 2,
    goods: ['Heating', 'Kitchen', 'Cable TV'],
    host: {
      name: 'Ivan',
      avatarUrl: 'img/avatar-ivan.jpg',
      isPro: false
    },
    images: [
      'img/apartment-01.jpg',
      'img/apartment-02.jpg',
      'img/apartment-03.jpg',
      'img/room.jpg',
    ],
    maxAdults: 5
  },
  {
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    bedrooms: 1,
    goods: ['Heating', 'Kitchen', 'Cable TV', 'Washing machine', 'Coffee machine', 'Dishwasher'],
    host: {
      name: 'Maria',
      avatarUrl: 'img/avatar-maria.jpg',
      isPro: true
    },
    images: [
      'img/apartment-01.jpg',
      'img/apartment-02.jpg',
      'img/apartment-03.jpg',
      'img/room.jpg',
    ],
    maxAdults: 2
  },
  {
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    bedrooms: 4,
    goods: ['Heating', 'Kitchen', 'Cable TV', 'Washing machine', 'Coffee machine', 'Dishwasher'],
    host: {
      name: 'Leo',
      avatarUrl: 'img/avatar-leo.jpg',
      isPro: true
    },
    images: [
      'img/apartment-01.jpg',
      'img/apartment-02.jpg',
    ],
    maxAdults: 6
  },
  {
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    bedrooms: 6,
    goods: ['Heating', 'Kitchen','Dishwasher'],
    host: {
      name: 'Nick',
      avatarUrl: 'img/avatar-nick.jpg',
      isPro: true
    },
    images: [
      'img/apartment-02.jpg',
      'img/apartment-03.jpg',
      'img/room.jpg',
    ],
    maxAdults: 10
  },
];

const detailedOffers: DetailedOffers = offers.map((offer, index) => ({
  ...offer,
  ...additionalInfo[index],
}));

export default detailedOffers;
