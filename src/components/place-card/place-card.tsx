import { memo, useMemo } from 'react';
import { Offer } from '../../types/offer-data';
import styles from './place-card.module.css';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { capitalizedString } from '../../utils';
import { getFavorites } from '../../store/favorites-data/favorites-data.selectors';
import Bookmark from '../bookmark/bookmark';
import classNames from 'classnames';
import { useAppSelector } from '../../hooks';

type PlaceCardProps = {
  offer: Offer;
  handlePlaceCardHover?: (id: string | null) => void;
}

function PlaceCard ({offer, handlePlaceCardHover}: PlaceCardProps): JSX.Element {
  const { price, title, type, id } = offer;
  const favorites = useAppSelector(getFavorites);

  const activeFavorite = useMemo(() => favorites.some((favorite) => favorite.id === id), [favorites, id]);

  const handleCardMouseEnter = () => {
    handlePlaceCardHover?.(id);
  };
  const handleCardMouseLeave = () => {
    handlePlaceCardHover?.(null);
  };

  return (
    <article
      onMouseEnter={handleCardMouseEnter}
      onMouseLeave={handleCardMouseLeave}
      className={classNames({
        'place-card': true,
        'cities__card': true,
        // 'favorites__card': activeFavorite
      })}
    >
      <div className={`place-card__mark ${offer.isPremium ? '' : 'visually-hidden'}`}>
        <span>Premium</span>
      </div>
      <div
        className={classNames({
          'place-card__image-wrapper': true,
          'cities__image-wrapper': !activeFavorite,
        })}
      >
        <Link to={`${AppRoute.Offer}/${offer.id}`}>
          <img
            className={styles['place-card__image']}
            src={offer.previewImage}
            alt="Place image"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">{price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <Bookmark
            id={id}
            isFavorite={activeFavorite}
            type='place-card'
          />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${String(offer.rating / 5 * 100)}%`}} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}/${offer.id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{capitalizedString(type)}</p>
      </div>
    </article>
  );
}

export default memo(PlaceCard);

