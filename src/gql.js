import { gql } from '@apollo/client';

export const TRACTS = gql`
  query {
    categories {
      tracts {
        author
        content
        id
        image
        title
        description
        tag {
          id
          type
        }
        reviews {
          id
          created_at
          rating
          review
        }
      }
      id
      type
    }
  }
`;
