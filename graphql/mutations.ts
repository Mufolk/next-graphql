import { gql } from "@apollo/client";

export const ADD_NOVEL = gql`
  mutation Mutation($image: String, $title: String) {
    addNovel(image: $image, title: $title) {
      id
      title
      image
      createdAt
      updatedAt
      authors {
        id
        name
        novel
      }
    }
  }
`;
