import meanBy from 'lodash.meanby';

const matchingTract = ({ by: id }) => (tract) => tract.id === id;

export const getRatingStars = (reviews) => {
  let ratingMean;
  let ratingToStars;
  
  if (reviews?.length > 0) {
    ratingMean = meanBy(reviews, 'rating');
    ratingToStars = [...new Array(Math.floor(ratingMean)).keys()];
  }

  return { ratingMean, ratingToStars };
};

export const getTractByRouteName = (data, routeName) => {
  const matchingCategory = data?.categories?.find(({ tracts }) =>
    tracts.find(matchingTract({ by: routeName }))
  );
  return matchingCategory.tracts.find(matchingTract({ by: routeName }));
};
