import meanBy from 'lodash.meanby';

const matchingTract = ({ by: id }) => (tract) => tract.id === id;

export const getRatingsStars = (reviews) => {
  let ratingMean;
  let ratingsToStars;
  
  if (reviews?.length > 0) {
    ratingMean = meanBy(reviews, 'rating');
    ratingsToStars = [...new Array(Math.floor(ratingMean)).keys()];
  }

  return { ratingMean, ratingsToStars };
};

export const getRatingToStars = (rating) => {
  return [...new Array(rating).keys()];
};

export const getTractByRouteName = (data, routeName) => {
  const matchingCategory = data?.categories?.find(({ tracts }) =>
    tracts.find(matchingTract({ by: routeName }))
  );
  return matchingCategory.tracts.find(matchingTract({ by: routeName }));
};
