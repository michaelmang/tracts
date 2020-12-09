import { gql } from '@apollo/client';

export const TRACTS = gql`
  query {
    categories {
      tracts(order_by: {tag: {type: asc}, title: asc}) {
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
        reviews(order_by: {created_at: asc}) {
          id
          created_at
          rating
          review
          reviewer
          review_title
        }
      }
      id
      type
    }
  }
`;

export const ADD_REVIEW = gql`
mutation ($rating: Int = 1, $review: String = "", $review_title: String = "", $reviewer: String = "", $tract_id: String = "", $id: uuid = "") {
  insert_reviews_one(object: {rating: $rating, review: $review, review_title: $review_title, reviewer: $reviewer, tract_id: $tract_id, id: $id}, on_conflict: {constraint: reviews_pkey, update_columns: [
			id
			review_title
			rating
			review
			review_title
			reviewer
			tract_id
  ]}) {
    id
  }
}`;
