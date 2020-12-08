import { useMutation } from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';
import {
  faPaperPlane,
  faSpinner,
  faStar,
  faThumbsUp,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import * as timeago from 'timeago.js';
import { useDebounce } from 'use-debounce';
import { v4 as uuidv4 } from 'uuid';
import { WindupChildren } from 'windups';

import Button from './Button.js';
import RatingStars from './RatingStars.js';
import LoginButton from './LoginButton.js';
import { ADD_REVIEW } from '../gql.js';
import { getRatingToStars } from '../selectors.js';

const DEBOUNCE = 100;

const starRatings = [1, 2, 3, 4, 5];

const getPercentOfRating = (reviews, starRating) =>
  (reviews.filter(({ rating }) => rating === starRating).length / reviews.length) * 100;

export default function Reader({ content, loading, match, refetch, reviews }) {
  const { isAuthenticated, user } = useAuth0();

  const [addReview, { data }] = useMutation(ADD_REVIEW);

  const [hoveredRating, setHoveredRating] = useState(null);
  const [rating, setRating] = useState(null);
  const [_title, setTitle] = useState('');
  const [title] = useDebounce(_title, DEBOUNCE);
  const [_review, setReview] = useState('');
  const [review] = useDebounce(_review, DEBOUNCE);
  const [needsRating, setNeedsRating] = useState(false);
  const [needsTitle, setNeedsTitle] = useState(false);
  const [needsReview, setNeedsReview] = useState(false);
  const [isAddingReview, setAddingReview] = useState(false);

  const updateHoveredRating = (value) => () => {
    setHoveredRating(value);
  };
  const updateRating = (value) => () => {
    if (needsRating) {
      setNeedsRating(false);
    }

    setRating(value);
  };
  const updateTitle = ({ target: { value } }) => {
    if (needsTitle) {
      setNeedsTitle(false);
    }

    setTitle(value);
  };
  const updateReview = ({ target: { value } }) => {
    if (needsReview) {
      setNeedsReview(false);
    }

    setReview(value);
  };

  const submitReview = () => {
    if (!rating) {
      setNeedsRating(true);
      return;
    }

    if (title && !review) {
      setNeedsReview(true);
      return;
    }

    if (!title && review) {
      setNeedsTitle(true);
    }

    addReview({
      variables: {
        id: data?.insert_reviews_one?.id || uuidv4(),
        rating,
        review,
        review_title: title,
        reviewer: user.name,
        tract_id: match.params.name,
      },
    });

    setAddingReview(true);
    setRating(null);
    setTitle('');
    setReview('');
  };

  useEffect(() => {
    if (
      isAddingReview &&
      data?.insert_reviews_one?.id &&
      !reviews.some((review) => review.reviewer === user.name)
    ) {
      refetch();
      return;
    }

    if (
      isAddingReview &&
      data?.insert_reviews_one?.id &&
      reviews.some((review) => review.reviewer === user.name)
    ) {
      setAddingReview(false);
      return;
    }
  }, [isAddingReview, data?.insert_reviews_one?.id, refetch, reviews, user?.name]);

  const hasAddedReview =
    isAuthenticated &&
    reviews?.some((review) => {
      return review?.reviewer === user?.name;
    });

  const hasRatings = reviews?.some((review) => review.rating);

  const hasReviews = reviews?.some((review) => review.review);

  const isStarHighlighted = (starRating) =>
    starRating <= hoveredRating || starRating <= rating;

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
      {!loading && (
        <div className="flex flex-col md:flex-row flex-wrap w-full px-10 md:px-12 justify-between">
          <div className="flex flex-col w-full mb-6 md:mb-0 md:w-1/4">
            <div className="text-white text-md md:text-xl mb-4">Rate & Review</div>
            {!isAuthenticated && (
              <LoginButton className="w-1/4 w-3/4 text-sm md:text-base" />
            )}
            {isAuthenticated && hasAddedReview && (
              <div className="flex text-white items-center">
                <FontAwesomeIcon className="mr-2" icon={faThumbsUp} />
                Thanks for the review!
              </div>
            )}
            {isAuthenticated && !hasAddedReview && (
              <div
                className={`px-6 p-8 border-solid border-2 ${
                  needsRating || needsTitle || needsReview
                    ? 'border-yellow-400 transform skew-y-1'
                    : 'border-red-700'
                }`}
              >
                <div className="flex flex-col mb-4">
                  <label className="mb-1 text-white text-base flex items-center">
                    Rating
                    <span className="ml-2 text-red-500 font-italic text-xs">
                      (Required)
                    </span>
                  </label>
                  <div className="flex">
                    {starRatings.map((starRating) => (
                      <FontAwesomeIcon
                        key={starRating}
                        className={`cursor-pointer mr-1 ${
                          isStarHighlighted(starRating) ? 'text-red-500' : 'text-white'
                        }
                        ${isAddingReview ? 'pointer-events-none' : 'pointer-events-auto'}
                         hover:text-red-500`}
                        onClick={updateRating(starRating)}
                        onMouseEnter={updateHoveredRating(starRating)}
                        onMouseLeave={updateHoveredRating(null)}
                        icon={faStar}
                      />
                    ))}
                  </div>
                  {needsRating && (
                    <WindupChildren>
                      <div className="mt-2 text-sm flex text-red-500 text-xs md:text-sm">
                        Whoops! We'll need at least a rating.
                      </div>
                    </WindupChildren>
                  )}
                </div>
                <div className="flex flex-col mb-4">
                  <label className="mb-1 text-white text-base" htmlFor="review_title">
                    Title
                  </label>
                  <input
                    id="review_title"
                    className="px-2 py-1 rounded-lg text-black text-sm md:text-sm"
                    disabled={isAddingReview}
                    onChange={updateTitle}
                    type="text"
                    value={_title}
                  />
                  {needsTitle && (
                    <WindupChildren>
                      <div className="mt-2 text-sm flex text-red-500 text-xs md:text-sm">
                        Could you include a title for your review, please?
                      </div>
                    </WindupChildren>
                  )}
                </div>
                <div className="flex flex-col mb-6">
                  <label className="mb-1 text-white text-base" htmlFor="review_review">
                    Review
                  </label>
                  <textarea
                    id="review_review"
                    className="p-3 rounded-lg text-black text-sm md:text-base"
                    disabled={isAddingReview}
                    onChange={updateReview}
                    type="textarea"
                    value={_review}
                  />
                  {needsReview && (
                    <WindupChildren>
                      <div className="mt-2 text-sm flex text-red-500 text-xs md:text-sm">
                        Nice title! It'd be a shame if it didn't have a review to go along
                        with it.
                      </div>
                    </WindupChildren>
                  )}
                </div>
                <Button
                  className={`bg-red-700 text-white ${
                    isAddingReview ? 'pointer-events-none' : 'pointer-events-all'
                  }`}
                  onClick={isAddingReview ? () => {} : submitReview}
                >
                  {!isAddingReview && (
                    <FontAwesomeIcon className="text-white mr-2" icon={faPaperPlane} />
                  )}
                  {!isAddingReview && 'Add Review'}
                  {isAddingReview && (
                    <FontAwesomeIcon
                      className={`text-white ${
                        isAddingReview ? 'mr-0 animate-spin' : 'mr-2'
                      }`}
                      icon={faSpinner}
                    />
                  )}
                </Button>
              </div>
            )}
          </div>
          <div className="flex flex-col w-full mb-6 md:mb-0 md:w-1/3">
            <div className="text-white text-md md:text-xl mb-4">Ratings</div>
            {!hasRatings && (
              <div className="text-white">Be the first to add a rating</div>
            )}
            {hasRatings && (
              <div className="flex flex-col items-center mb-4 bg-red-700 text-white p-4 rounded">
                <div className="flex items-center justify-center rounded-full bg-white mb-1 px-4 py-2 w-full">
                  <RatingStars reviews={reviews} />
                </div>
                <div className="flex text-sm mb-4">
                  {reviews.length} {reviews.length === 1 ? 'rating' : 'ratings'}
                </div>
                {starRatings
                  .map((starRating) => (
                    <div key={starRating} className="flex flex-col w-full px-4 mb-2">
                      <div className="flex items-center w-full">
                        <div className="flex w-full items-center">
                          <div className="text-white mr-2">{starRating} star</div>
                          <div className="w-7/12 md:w-3/4 overflow-hidden rounded-full h-3 text-xs flex bg-gray-800">
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
            )}
          </div>
          <div className="flex flex-col w-full mb-6 md:mb-0 md:w-1/3">
            <div className="text-white text-md md:text-xl mb-4">Reviews</div>
            {!hasReviews && (
              <div className="text-white">
                {hasRatings && "No reviews"}
                {!hasRatings && "Be the first one to write a review"}
              </div>
            )}
            {hasReviews &&
              reviews
                .filter(({ review }) => !!review)
                .map(({ created_at, id, rating, review, reviewer, review_title }) => (
                  <div key={id} className="flex flex-col">
                    <div className="flex flex-col border-red-700 border-2 border-solid px-6 py-4 text-white">
                      <div className="flex text-gray-400 mb-4 text-xs md:text-sm justify-between">
                        <div className="flex items-center">
                          {reviewer}{' '}
                          {user?.name === reviewer && (
                            <FontAwesomeIcon
                              className="-mt-1 ml-1 text-yellow-300"
                              icon={faStar}
                              size="sm"
                            />
                          )}
                        </div>
                        <div className="flex items-center">
                          {timeago.format(created_at)}
                        </div>
                      </div>
                      <div className="flex text-xs md:text-sm mb-2 text-red-500">
                        {getRatingToStars(rating).map((starRating) => (
                          <FontAwesomeIcon
                            key={starRating}
                            className="mr-1"
                            icon={faStar}
                          />
                        ))}
                      </div>
                      <div className="flex text-sm md:text-base font-bold">
                        {review_title}
                      </div>
                      <div className="flex text-sm md:text-base">{review}</div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      )}
    </div>
  );
}
