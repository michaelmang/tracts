import { useAuth0 } from '@auth0/auth0-react';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as timeago from 'timeago.js';

import RatingStars from './RatingStars.js';

const starRatings = [1, 2, 3, 4, 5];

const getPercentOfRating = (reviews, starRating) =>
  (reviews.filter(({ rating }) => rating === starRating).length / reviews.length) * 100;

export default function Reader({ content, reviews }) {
  const { user } = useAuth0();

  const percentsOfRating = {};

  starRatings.forEach((starRating) => {
    percentsOfRating[starRating] = getPercentOfRating(reviews, starRating);
  });

  return (
    <div className="flex flex-col w-full items-center min-h-screen">
      <div
        className="text-white p-10 md:p-12 max-w-4xl text-justify text-sm md:text-md"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      {reviews.length > 0 && (
        <div className="flex w-full px-12 justify-between">
          <div className="flex flex-col w-1/3">
            <div className="text-white text-md md:text-xl mb-4">Ratings</div>
            <div className="flex flex-col items-center mb-4 bg-red-700 text-white p-4 rounded">
              <div className="flex items-center justify-between rounded-full bg-white mb-1 px-4 py-2 w-full">
                <RatingStars reviews={reviews} />
                <div className="text-black">4.7 out of 5</div>
              </div>
              <div className="flex text-sm mb-4">{reviews.length} ratings</div>
              {starRatings
                .map((starRating) => (
                  <div key={starRating} className="flex flex-col w-full px-4 mb-2">
                    <div className="flex items-center w-full">
                      <div className="flex w-full items-center">
                        <div className="text-white mr-2">{starRating} star</div>
                        <div className="w-3/4 overflow-hidden rounded-full h-3 text-xs flex bg-gray-800">
                          <div
                            className="rounded-full flex flex-col text-center whitespace-nowrap text-white justify-center bg-white"
                            style={{
                              width: `${percentsOfRating[starRating]}%`,
                            }}
                          />
                        </div>
                      </div>
                      {percentsOfRating[starRating]}%
                    </div>
                  </div>
                ))
                .reverse()}
            </div>
          </div>
          <div className="flex flex-col w-1/3">
            <div className="text-white text-md md:text-xl mb-4">Reviews</div>
            {reviews
              .filter(({ review }) => !!review)
              .map(({ created_at, id, review, reviewer, review_title }) => (
                <div key={id} className="flex flex-col">
                  <div className="flex flex-col border-red-700 border-2 border-solid px-8 py-6 text-white">
                    <div className="flex text-gray-400 mb-2 text-sm justify-between">
                      <span>
                        {reviewer} {user?.name === reviewer && (
                          <FontAwesomeIcon color="#FBBF24" icon={faStar} size="sm" />
                        )}
                      </span>
                      <span>{timeago.format(created_at)}</span>
                    </div>
                    <div className="flex text-base font-bold mb-1 text-red-500">
                      {review_title}
                    </div>
                    <div className="flex text-base">{review}</div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
