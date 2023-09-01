import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addFavorite, deleteFavorite } from '../../store/api-actions';
import { Offer } from '../../types/offer-data';
import { getAuthorizationStatus } from '../../store/user-data/user-data.selectors';
import { AuthorizationStatus, AppRoute } from '../../const';
import classNames from 'classnames';
import { getFavorites } from '../../store/favorites-data/favorites-data.selectors';


type BookmarkProps = {
  id: Offer['id'];
  type: string;
  large?: boolean;
}

function Bookmark({id, type, large = false }: BookmarkProps){

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const favorites = useAppSelector(getFavorites);

  const isFavorite = useMemo(() => favorites.some((favorite) => favorite.id === id), [favorites, id]);

  const handleBookmarkClick = () => {
    if (authorizationStatus === AuthorizationStatus.NoAuth) {
      navigate(AppRoute.Login);
    }

    if (isFavorite) {
      dispatch(deleteFavorite(id));
    } else {
      dispatch(addFavorite(id));
    }
  };

  return (
    <button
      type="button"
      onClick={handleBookmarkClick}
      className={classNames(`${type}__bookmark-button`, 'button', {[`${type}__bookmark-button--active`]: isFavorite}
      )}
    >
      <svg
        className={classNames(`${type}__bookmark-icon`)}
        width={large ? '31' : '18'}
        height={large ? '33' : '19'}
      >
        <use xlinkHref="#icon-bookmark" />
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}

export default Bookmark;

