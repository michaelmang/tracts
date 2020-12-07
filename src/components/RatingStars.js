import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';

import { getRatingsStars } from '../selectors.js';

export default function RatingStars({ className, reviews }) {
  const { ratingMean, ratingsToStars } = getRatingsStars(reviews);

  if (!ratingsToStars) {
    return null;
  }
  
  return (
    <div className={`flex items-center ${className}`}>
      <div className="text-red-700 mr-1 mt-1">{ratingMean}</div>
      {ratingsToStars.map((_) => (
        <FontAwesomeIcon key={_} className="mr-1" color="#B91C1C" icon={faStar} />
      ))}
      {!Number.isInteger(ratingMean) && <FontAwesomeIcon color="#B91C1C" icon={faStarHalf} />}
    </div>
  );
}