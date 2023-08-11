import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import OffersList from '../../components/offers-list/offers-list';
import Header from '../../components/header/header';
import { Offer } from '../../types/types';
import Map from '../../components/map/map';
import CityList from '../../components/city-list/city-list';
import { useAppSelector } from '../../hooks';
import { CitiesList, CityMap } from '../../const';
import { MainEmptyPage } from '../main-empty/main-empty';
import FilterOffers from '../../components/filter-offers/filter-offers';

function Main (): JSX.Element {
  const [selectedPoint, setSelectedPoint] = useState<Offer | undefined>(
    undefined
  );

  const activeCity = useAppSelector((state) => state.city);
  const sortedOffers = useAppSelector((state) => state.sortedOffers);
  const city = CityMap[activeCity];

  const handleListItemHover = (id: string) => {
    const currentPoint = sortedOffers.find((item) => item.id === id);

    setSelectedPoint(currentPoint);
  };

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>Six cities.Main page</title>
      </Helmet>
      <Header />
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
