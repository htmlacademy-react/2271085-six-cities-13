import PlaceCard from '../place-card/place-card';
import { Offers } from '../../types/types';

type OffersListProps = {
  offers: Offers;
  onListItemHover?: (id: string) => void;
  className: string;
};

function OffersList({offers, onListItemHover, className}: OffersListProps) {

  const handlePlaceCardHover = (id: string) => {
    if (onListItemHover){
      onListItemHover(id);
    }
  };

  return (
    <div className={className}>
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
