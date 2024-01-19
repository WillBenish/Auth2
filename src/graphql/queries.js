/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSubscriptions = /* GraphQL */ `
  query GetSubscriptions($id: ID!) {
    getSubscriptions(id: $id) {
      id
      creatorId
      subscriberEmail
      subscriberId
      createdAt
      SubscriptionStatus
      updatedAt
      __typename
    }
  }
`;
export const listSubscriptions = /* GraphQL */ `
  query ListSubscriptions(
    $filter: ModelSubscriptionsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSubscriptions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        creatorId
        subscriberEmail
        subscriberId
        createdAt
        SubscriptionStatus
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getShare = /* GraphQL */ `
  query GetShare($id: ID!) {
    getShare(id: $id) {
      id
      book
      shareType
      recipient
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listShares = /* GraphQL */ `
  query ListShares(
    $filter: ModelShareFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listShares(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        book
        shareType
        recipient
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getMediaRaw = /* GraphQL */ `
  query GetMediaRaw($id: ID!) {
    getMediaRaw(id: $id) {
      id
      type
      createdAt
      createdBy
      originalFileName
      updatedAt
      __typename
    }
  }
`;
export const listMediaRaws = /* GraphQL */ `
  query ListMediaRaws(
    $filter: ModelMediaRawFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMediaRaws(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        type
        createdAt
        createdBy
        originalFileName
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getImageRaw = /* GraphQL */ `
  query GetImageRaw($id: ID!) {
    getImageRaw(id: $id) {
      id
      s3_filename
      createdAt
      createdBy
      originalFileName
      updatedAt
      __typename
    }
  }
`;
export const listImageRaws = /* GraphQL */ `
  query ListImageRaws(
    $filter: ModelImageRawFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listImageRaws(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        s3_filename
        createdAt
        createdBy
        originalFileName
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getBook = /* GraphQL */ `
  query GetBook($id: ID!) {
    getBook(id: $id) {
      id
      name
      createdAt
      cover_s3_key
      creatorUserId
      bookPages
      intro_video_s3_key
      outro_video_s3_key
      raw_book_read_s3_key
      updatedAt
      __typename
    }
  }
`;
export const listBooks = /* GraphQL */ `
  query ListBooks(
    $filter: ModelBookFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBooks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        createdAt
        cover_s3_key
        creatorUserId
        bookPages
        intro_video_s3_key
        outro_video_s3_key
        raw_book_read_s3_key
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($email: AWSEmail!) {
    getUser(email: $email) {
      id
      email
      given_name
      family_name
      oauth_provider
      oauth_provider_id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $email: AWSEmail
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUsers(
      email: $email
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        email
        given_name
        family_name
        oauth_provider
        oauth_provider_id
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
