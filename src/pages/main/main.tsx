import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import OffersList from '../../components/offers-list/offers-list';
import Logo from '../../components/logo/logo';
import { Offer,City } from '../../types/types';
import Map from '../../components/map/map';
import CityList from '../../components/city-list/city-list';
import { useAppSelector } from '../../hooks';
import { CitiesList } from '../../const';
import { MainEmptyPage } from '../main-empty/main-empty';
import FilterOffers from '../../components/filter-offers/filter-offers';
import { Link } from 'react-router-dom';

type MainProps = {
  city: City;
}

function Main ({ city }: MainProps): JSX.Element {
  const [selectedPoint, setSelectedPoint] = useState<Offer | undefined>(
    undefined
  );

  const activeCity = useAppSelector((state) => state.city);
  const sortedOffers = useAppSelector((state) => state.sortedOffers);

  const handleListItemHover = (id: string) => {
    const currentPoint = sortedOffers.find((item) => item.id === id);

    setSelectedPoint(currentPoint);
  };

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>Six cities.Main page</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link
                    className="header__nav-link header__nav-link--profile"
                    to="#"
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">
                      Oliver.conner@gmail.com
                    </span>
                    <span className="header__favorite-count">3</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <Link className="header__nav-link" to="#">
                    <span className="header__signout">Sign out</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      {
        sortedOffers.length ?
          <main className="page__main page__main--index">
            <h1 className="visually-hidden">Cities</h1>
            <div className="tabs">
              <section className="locations container">
                <CityList
                  cities={CitiesList}
                  currentCity={activeCity}
                />
              </section>
            </div>
            <div className="cities">
              <div className="cities__places-container container">
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{sortedOffers.length} places to stay in {activeCity}</b>
                  <FilterOffers />
                  <OffersList
                    offers={sortedOffers}
                    onListItemHover={handleListItemHover}
                    className="cities__places-list places__list tabs__content"
                  />
                </section>
                <div className="cities__right-section">
                  <Map
                    block='cities'
                    city={city}
                    points={sortedOffers}
                    selectedPoint={selectedPoint}
                  />
                </div>
              </div>
            </div>
          </main>
          :
          <main className="page__main page__main--index page__main--index-empty">
            <h1 className="visually-hidden">Cities</h1>
            <div className="tabs">
              <section className="locations container">
                <CityList
                  cities={CitiesList}
                  currentCity={activeCity}
                />
              </section>
            </div>
            <MainEmptyPage />
          </main>
      }
    </div>

  );
}

export default Main;
