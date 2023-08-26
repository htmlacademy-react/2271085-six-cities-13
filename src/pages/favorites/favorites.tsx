import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import { Link } from 'react-router-dom';
import FavoriteCard from '../../components/favorites-card/favorites-card';
import FavoritesEmpty from '../../components/favorites-empty/favorites-empty';
import { useAppSelector } from '../../hooks';
import { getFavorites } from '../../store/favorites-data/favorites-data.selectors';
import { AppRoute } from '../../const';


function FavoritePage(): JSX.Element {

  const favoriteOffers = useAppSelector(getFavorites);
  const cities = Array.from(new Set(favoriteOffers.map((offer) => offer.city.name)));

  return (
    <div className={favoriteOffers.length ? 'page' : 'page page--favorites-empty'}>
      <Helmet>
        <title>Six cities.Favorites</title>
      </Helmet>
      <Header />
      {favoriteOffers.length ?
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {cities.map((city) => (
                  <li className="favorites__locations-items" key={city}>
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <a className="locations__item-link" href="#">
                          <span>{city}</span>
                        </a>
                      </div>
                    </div>
                    <div className="favorites__places">
                      {favoriteOffers.filter((offer) => offer.city.name === city).map((offer) => <FavoriteCard offer={offer} key={offer.id}/>)}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </main>
        :
        <FavoritesEmpty />}
      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoute.Main}>
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width={64}
            height={33}
          />
        </Link>
      </footer>
    </div>
  );
}

export default FavoritePage;
