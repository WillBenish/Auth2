/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateSubscriptions = /* GraphQL */ `
  subscription OnCreateSubscriptions(
    $filter: ModelSubscriptionSubscriptionsFilterInput
  ) {
    onCreateSubscriptions(filter: $filter) {
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
export const onUpdateSubscriptions = /* GraphQL */ `
  subscription OnUpdateSubscriptions(
    $filter: ModelSubscriptionSubscriptionsFilterInput
  ) {
    onUpdateSubscriptions(filter: $filter) {
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
export const onDeleteSubscriptions = /* GraphQL */ `
  subscription OnDeleteSubscriptions(
    $filter: ModelSubscriptionSubscriptionsFilterInput
  ) {
    onDeleteSubscriptions(filter: $filter) {
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
export const onCreateShare = /* GraphQL */ `
  subscription OnCreateShare($filter: ModelSubscriptionShareFilterInput) {
    onCreateShare(filter: $filter) {
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
export const onUpdateShare = /* GraphQL */ `
  subscription OnUpdateShare($filter: ModelSubscriptionShareFilterInput) {
    onUpdateShare(filter: $filter) {
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
export const onDeleteShare = /* GraphQL */ `
  subscription OnDeleteShare($filter: ModelSubscriptionShareFilterInput) {
    onDeleteShare(filter: $filter) {
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
export const onCreateMediaRaw = /* GraphQL */ `
  subscription OnCreateMediaRaw($filter: ModelSubscriptionMediaRawFilterInput) {
    onCreateMediaRaw(filter: $filter) {
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
export const onUpdateMediaRaw = /* GraphQL */ `
  subscription OnUpdateMediaRaw($filter: ModelSubscriptionMediaRawFilterInput) {
    onUpdateMediaRaw(filter: $filter) {
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
export const onDeleteMediaRaw = /* GraphQL */ `
  subscription OnDeleteMediaRaw($filter: ModelSubscriptionMediaRawFilterInput) {
    onDeleteMediaRaw(filter: $filter) {
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
export const onCreateImageRaw = /* GraphQL */ `
  subscription OnCreateImageRaw($filter: ModelSubscriptionImageRawFilterInput) {
    onCreateImageRaw(filter: $filter) {
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
export const onUpdateImageRaw = /* GraphQL */ `
  subscription OnUpdateImageRaw($filter: ModelSubscriptionImageRawFilterInput) {
    onUpdateImageRaw(filter: $filter) {
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
export const onDeleteImageRaw = /* GraphQL */ `
  subscription OnDeleteImageRaw($filter: ModelSubscriptionImageRawFilterInput) {
    onDeleteImageRaw(filter: $filter) {
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
export const onCreateBook = /* GraphQL */ `
  subscription OnCreateBook($filter: ModelSubscriptionBookFilterInput) {
    onCreateBook(filter: $filter) {
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
export const onUpdateBook = /* GraphQL */ `
  subscription OnUpdateBook($filter: ModelSubscriptionBookFilterInput) {
    onUpdateBook(filter: $filter) {
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
export const onDeleteBook = /* GraphQL */ `
  subscription OnDeleteBook($filter: ModelSubscriptionBookFilterInput) {
    onDeleteBook(filter: $filter) {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
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
