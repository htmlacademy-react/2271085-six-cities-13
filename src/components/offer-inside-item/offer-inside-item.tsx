type OfferInsideItemProps = {
  item: string;
}

function OfferInsideItem ({item}: OfferInsideItemProps): JSX.Element {
  return (
    <li className="offer__inside-item">{item}</li>
  );
}

export default OfferInsideItem;
