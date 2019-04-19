import gql from 'graphql-tag';

export const allUsersQuery = gql`
  query allPosts {
    allPosts {
      id
      title
      description
      url
      likes
    }
  }
`;

export const createUserQuery = gql`
  mutation createPost($title: String!, $description: String!, $url: String!) {
    createPost(title: $title, description: $description,url: $url) {
      id
      title
      description
      url
    }
  }
`;

export const updateUserQuery = gql`
  mutation updatePost($id: ID!, $title: String!, $description: String!, $url: String!) {
    updatePost(id: $id, title: $title, description: $description,url: $url) {
      id
      title
      description
      url
    }
  }
`;

export const likeUserQuery = gql`
  mutation updatePost($id: ID!, $likes: Int!) {
    updatePost(id: $id, likes: $likes) {
      id
      likes
    }
  }
`;

export const deleteUserQuery = gql`
  mutation deletePost($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`;

export const likedUserQuery = gql`
  subscription likedPost {
    Post(
      filter: {
        mutation_in: [UPDATED]
        updatedFields_contains: "likes"
      }
    ) {
      mutation
      node {
        id
        likes
      }
    }
  }
`
