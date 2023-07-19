import PlaceCard from '../place-card/place-card';
import { Offers } from '../../types';

type OffersListProps = {
  offers: Offers;
};

function OffersList({offers}: OffersListProps) {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
        />)
      )}
    </div>
  );
}

export default OffersList;
