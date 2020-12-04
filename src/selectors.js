const matchingTract = ({ by: id }) => (tract) => tract.id === id;

export const getTractByRouteName = (data, routeName) => {
  const matchingCategory = data?.categories?.find(({ tracts }) =>
    tracts.find(matchingTract({ by: routeName }))
  );
  return matchingCategory.tracts.find(matchingTract({ by: routeName }));
};
