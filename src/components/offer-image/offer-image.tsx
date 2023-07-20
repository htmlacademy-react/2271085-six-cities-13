type OfferImageProps = {
  imageUrl: string;
}

function OfferImage({imageUrl}: OfferImageProps): JSX.Element {
  return (
    <div className="offer__image-wrapper">
      <img
        className="offer__image"
        src={imageUrl}
        alt="Photo studio"
      />
    </div>
  );
}

export default OfferImage;
