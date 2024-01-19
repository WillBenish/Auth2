/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createSubscriptions = /* GraphQL */ `
  mutation CreateSubscriptions(
    $input: CreateSubscriptionsInput!
    $condition: ModelSubscriptionsConditionInput
  ) {
    createSubscriptions(input: $input, condition: $condition) {
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
export const updateSubscriptions = /* GraphQL */ `
  mutation UpdateSubscriptions(
    $input: UpdateSubscriptionsInput!
    $condition: ModelSubscriptionsConditionInput
  ) {
    updateSubscriptions(input: $input, condition: $condition) {
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
export const deleteSubscriptions = /* GraphQL */ `
  mutation DeleteSubscriptions(
    $input: DeleteSubscriptionsInput!
    $condition: ModelSubscriptionsConditionInput
  ) {
    deleteSubscriptions(input: $input, condition: $condition) {
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
export const createShare = /* GraphQL */ `
  mutation CreateShare(
    $input: CreateShareInput!
    $condition: ModelShareConditionInput
  ) {
    createShare(input: $input, condition: $condition) {
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
export const updateShare = /* GraphQL */ `
  mutation UpdateShare(
    $input: UpdateShareInput!
    $condition: ModelShareConditionInput
  ) {
    updateShare(input: $input, condition: $condition) {
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
export const deleteShare = /* GraphQL */ `
  mutation DeleteShare(
    $input: DeleteShareInput!
    $condition: ModelShareConditionInput
  ) {
    deleteShare(input: $input, condition: $condition) {
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
export const createMediaRaw = /* GraphQL */ `
  mutation CreateMediaRaw(
    $input: CreateMediaRawInput!
    $condition: ModelMediaRawConditionInput
  ) {
    createMediaRaw(input: $input, condition: $condition) {
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
export const updateMediaRaw = /* GraphQL */ `
  mutation UpdateMediaRaw(
    $input: UpdateMediaRawInput!
    $condition: ModelMediaRawConditionInput
  ) {
    updateMediaRaw(input: $input, condition: $condition) {
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
export const deleteMediaRaw = /* GraphQL */ `
  mutation DeleteMediaRaw(
    $input: DeleteMediaRawInput!
    $condition: ModelMediaRawConditionInput
  ) {
    deleteMediaRaw(input: $input, condition: $condition) {
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
export const createImageRaw = /* GraphQL */ `
  mutation CreateImageRaw(
    $input: CreateImageRawInput!
    $condition: ModelImageRawConditionInput
  ) {
    createImageRaw(input: $input, condition: $condition) {
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
export const updateImageRaw = /* GraphQL */ `
  mutation UpdateImageRaw(
    $input: UpdateImageRawInput!
    $condition: ModelImageRawConditionInput
  ) {
    updateImageRaw(input: $input, condition: $condition) {
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
export const deleteImageRaw = /* GraphQL */ `
  mutation DeleteImageRaw(
    $input: DeleteImageRawInput!
    $condition: ModelImageRawConditionInput
  ) {
    deleteImageRaw(input: $input, condition: $condition) {
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
export const createBook = /* GraphQL */ `
  mutation CreateBook(
    $input: CreateBookInput!
    $condition: ModelBookConditionInput
  ) {
    createBook(input: $input, condition: $condition) {
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
export const updateBook = /* GraphQL */ `
  mutation UpdateBook(
    $input: UpdateBookInput!
    $condition: ModelBookConditionInput
  ) {
    updateBook(input: $input, condition: $condition) {
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
export const deleteBook = /* GraphQL */ `
  mutation DeleteBook(
    $input: DeleteBookInput!
    $condition: ModelBookConditionInput
  ) {
    deleteBook(input: $input, condition: $condition) {
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
