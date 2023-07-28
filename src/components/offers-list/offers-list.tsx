import PlaceCard from '../place-card/place-card';
import { Offers } from '../../types';

type OffersListProps = {
  offers: Offers;
  onListItemHover: (id: string) => void;
};

function OffersList({offers, onListItemHover}: OffersListProps) {

  const handlePlaceCardHover = (id: string) => {
    onListItemHover(id);
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          handlePlaceCardHover={() => handlePlaceCardHover(offer.id)}
        />)
      )}
    </div>
  );
}

export default OffersList;
