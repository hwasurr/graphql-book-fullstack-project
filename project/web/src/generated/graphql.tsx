/* eslint-disable */
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type CreateOrUpdateCutReviewInput = {
  /** 명장면 번호 */
  cutId: Scalars['Int'];
  /** 감상평 내용 */
  contents: Scalars['String'];
};

export type Cut = {
  __typename?: 'Cut';
  /** 명장면 고유 아이디 */
  id: Scalars['Int'];
  /** 명장면 사진 주소 */
  src: Scalars['String'];
  /** 영화 아이디 */
  filmId: Scalars['Int'];
  film?: Maybe<Film>;
  votesCount: Scalars['Int'];
  isVoted: Scalars['Boolean'];
};

export type CutReview = {
  __typename?: 'CutReview';
  id: Scalars['Int'];
  /** 감상평 내용 */
  contents: Scalars['String'];
  /** 명장면 번호 */
  cutId: Scalars['Int'];
  user: User;
  /** 생성 일자 */
  createdAt: Scalars['String'];
  /** 수정 일자 */
  updatedAt: Scalars['String'];
  isMine: Scalars['Boolean'];
};

export type Director = {
  __typename?: 'Director';
  id: Scalars['Int'];
  name: Scalars['String'];
};

/** 필드 에러 타입 */
export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Film = {
  __typename?: 'Film';
  /** 영화 고유 아이디 */
  id: Scalars['Int'];
  /** 영화 제목 */
  title: Scalars['String'];
  /** 영화 부제목 */
  subtitle?: Maybe<Scalars['String']>;
  /** 영화 장르 */
  genre: Scalars['String'];
  /** 영화 러닝 타임, minute */
  runningTime: Scalars['Float'];
  /** 영화 줄거리 및 설명 */
  description: Scalars['String'];
  /** 제작자 고유 아이디 */
  director_id: Scalars['Int'];
  /** 포스터 이미지 URL */
  posterImg: Scalars['String'];
  /** 개봉일 */
  release: Scalars['String'];
  director: Director;
};

/** 로그인 인풋 데이터 */
export type LoginInput = {
  emailOrUsername: Scalars['String'];
  password: Scalars['String'];
};

/** 로그인 반환 데이터 */
export type LoginResponse = {
  __typename?: 'LoginResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
  accessToken?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  vote: Scalars['Boolean'];
  createOrUpdateCutReview?: Maybe<CutReview>;
  deleteReview: Scalars['Boolean'];
  createNotification: Notification;
  signUp: User;
  login: LoginResponse;
  logout: Scalars['Boolean'];
  refreshAccessToken?: Maybe<RefreshAccessTokenResponse>;
  uploadProfileImage: Scalars['Boolean'];
};


export type MutationVoteArgs = {
  cutId: Scalars['Int'];
};


export type MutationCreateOrUpdateCutReviewArgs = {
  cutReviewInput: CreateOrUpdateCutReviewInput;
};


export type MutationDeleteReviewArgs = {
  id: Scalars['Int'];
};


export type MutationCreateNotificationArgs = {
  text: Scalars['String'];
  userId: Scalars['Int'];
};


export type MutationSignUpArgs = {
  signUpInput: SignUpInput;
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
};


export type MutationUploadProfileImageArgs = {
  file: Scalars['Upload'];
};

export type Notification = {
  __typename?: 'Notification';
  id: Scalars['Int'];
  text: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  userId: Scalars['Float'];
};

export type PaginatedFilms = {
  __typename?: 'PaginatedFilms';
  films: Array<Film>;
  cursor?: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  cuts: Array<Cut>;
  cut?: Maybe<Cut>;
  cutReviews: Array<CutReview>;
  films: PaginatedFilms;
  film?: Maybe<Film>;
  /** 세션에 해당되는 유저의 모든 알림을 가져옵니다. */
  notifications: Array<Notification>;
  me?: Maybe<User>;
};


export type QueryCutsArgs = {
  filmId: Scalars['Int'];
};


export type QueryCutArgs = {
  cutId: Scalars['Int'];
};


export type QueryCutReviewsArgs = {
  take?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  cutId: Scalars['Int'];
};


export type QueryFilmsArgs = {
  cursor?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryFilmArgs = {
  filmId: Scalars['Int'];
};

/** 액세스 토큰 새로고침 반환 데이터 */
export type RefreshAccessTokenResponse = {
  __typename?: 'RefreshAccessTokenResponse';
  accessToken: Scalars['String'];
};

export type SignUpInput = {
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  newNotification: Notification;
};


export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  /** 유저 이름 */
  username: Scalars['String'];
  /** 유저 이메일 */
  email: Scalars['String'];
  /** 프로필 사진 경로 */
  profileImage?: Maybe<Scalars['String']>;
  /** 생성 일자 */
  createdAt: Scalars['String'];
  /** 업데이트 일자 */
  updatedAt: Scalars['String'];
};

export type CreateOrUpdateCutReviewMutationVariables = Exact<{
  cutReviewInput: CreateOrUpdateCutReviewInput;
}>;


export type CreateOrUpdateCutReviewMutation = (
  { __typename?: 'Mutation' }
  & { createOrUpdateCutReview?: Maybe<(
    { __typename?: 'CutReview' }
    & Pick<CutReview, 'contents' | 'cutId' | 'id' | 'createdAt' | 'isMine'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'username' | 'email'>
    ) }
  )> }
);

export type DeleteCutReviewMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteCutReviewMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteReview'>
);

export type LoginMutationVariables = Exact<{
  loginInput: LoginInput;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'accessToken'>
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'email'>
    )> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RefreshAccessTokenMutationVariables = Exact<{ [key: string]: never; }>;


export type RefreshAccessTokenMutation = (
  { __typename?: 'Mutation' }
  & { refreshAccessToken?: Maybe<(
    { __typename?: 'RefreshAccessTokenResponse' }
    & Pick<RefreshAccessTokenResponse, 'accessToken'>
  )> }
);

export type SignUpMutationVariables = Exact<{
  signUpInput: SignUpInput;
}>;


export type SignUpMutation = (
  { __typename?: 'Mutation' }
  & { signUp: (
    { __typename?: 'User' }
    & Pick<User, 'email' | 'username' | 'createdAt' | 'updatedAt' | 'id'>
  ) }
);

export type UploadProfileImageMutationVariables = Exact<{
  file: Scalars['Upload'];
}>;


export type UploadProfileImageMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'uploadProfileImage'>
);

export type VoteMutationVariables = Exact<{
  cutId: Scalars['Int'];
}>;


export type VoteMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'vote'>
);

export type CutQueryVariables = Exact<{
  cutId: Scalars['Int'];
}>;


export type CutQuery = (
  { __typename?: 'Query' }
  & { cut?: Maybe<(
    { __typename?: 'Cut' }
    & Pick<Cut, 'id' | 'src' | 'votesCount' | 'isVoted'>
    & { film?: Maybe<(
      { __typename?: 'Film' }
      & Pick<Film, 'id' | 'title'>
    )> }
  )>, cutReviews: Array<(
    { __typename?: 'CutReview' }
    & Pick<CutReview, 'id' | 'contents' | 'isMine'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'username' | 'email'>
    ) }
  )> }
);

export type CutsQueryVariables = Exact<{
  filmId: Scalars['Int'];
}>;


export type CutsQuery = (
  { __typename?: 'Query' }
  & { cuts: Array<(
    { __typename?: 'Cut' }
    & Pick<Cut, 'id' | 'src'>
  )> }
);

export type FilmQueryVariables = Exact<{
  filmId: Scalars['Int'];
}>;


export type FilmQuery = (
  { __typename?: 'Query' }
  & { film?: Maybe<(
    { __typename?: 'Film' }
    & Pick<Film, 'id' | 'title' | 'subtitle' | 'description' | 'genre' | 'runningTime' | 'posterImg' | 'release'>
    & { director: (
      { __typename?: 'Director' }
      & Pick<Director, 'id' | 'name'>
    ) }
  )> }
);

export type FilmsQueryVariables = Exact<{
  limit?: Maybe<Scalars['Int']>;
  cursor?: Maybe<Scalars['Int']>;
}>;


export type FilmsQuery = (
  { __typename?: 'Query' }
  & { films: (
    { __typename?: 'PaginatedFilms' }
    & Pick<PaginatedFilms, 'cursor'>
    & { films: Array<(
      { __typename?: 'Film' }
      & Pick<Film, 'id' | 'title' | 'subtitle' | 'runningTime' | 'release' | 'posterImg'>
      & { director: (
        { __typename?: 'Director' }
        & Pick<Director, 'name'>
      ) }
    )> }
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'email' | 'profileImage' | 'updatedAt' | 'createdAt'>
  )> }
);

export type NotificationsQueryVariables = Exact<{ [key: string]: never; }>;


export type NotificationsQuery = (
  { __typename?: 'Query' }
  & { notifications: Array<(
    { __typename?: 'Notification' }
    & Pick<Notification, 'id' | 'userId' | 'text' | 'createdAt' | 'updatedAt'>
  )> }
);

export type NewNotificationSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NewNotificationSubscription = (
  { __typename?: 'Subscription' }
  & { newNotification: (
    { __typename?: 'Notification' }
    & Pick<Notification, 'id' | 'userId' | 'text' | 'createdAt' | 'updatedAt'>
  ) }
);


export const CreateOrUpdateCutReviewDocument = gql`
    mutation createOrUpdateCutReview($cutReviewInput: CreateOrUpdateCutReviewInput!) {
  createOrUpdateCutReview(cutReviewInput: $cutReviewInput) {
    contents
    cutId
    id
    user {
      username
      email
    }
    createdAt
    isMine
  }
}
    `;
export type CreateOrUpdateCutReviewMutationFn = Apollo.MutationFunction<CreateOrUpdateCutReviewMutation, CreateOrUpdateCutReviewMutationVariables>;

/**
 * __useCreateOrUpdateCutReviewMutation__
 *
 * To run a mutation, you first call `useCreateOrUpdateCutReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrUpdateCutReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrUpdateCutReviewMutation, { data, loading, error }] = useCreateOrUpdateCutReviewMutation({
 *   variables: {
 *      cutReviewInput: // value for 'cutReviewInput'
 *   },
 * });
 */
export function useCreateOrUpdateCutReviewMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrUpdateCutReviewMutation, CreateOrUpdateCutReviewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrUpdateCutReviewMutation, CreateOrUpdateCutReviewMutationVariables>(CreateOrUpdateCutReviewDocument, options);
      }
export type CreateOrUpdateCutReviewMutationHookResult = ReturnType<typeof useCreateOrUpdateCutReviewMutation>;
export type CreateOrUpdateCutReviewMutationResult = Apollo.MutationResult<CreateOrUpdateCutReviewMutation>;
export type CreateOrUpdateCutReviewMutationOptions = Apollo.BaseMutationOptions<CreateOrUpdateCutReviewMutation, CreateOrUpdateCutReviewMutationVariables>;
export const DeleteCutReviewDocument = gql`
    mutation deleteCutReview($id: Int!) {
  deleteReview(id: $id)
}
    `;
export type DeleteCutReviewMutationFn = Apollo.MutationFunction<DeleteCutReviewMutation, DeleteCutReviewMutationVariables>;

/**
 * __useDeleteCutReviewMutation__
 *
 * To run a mutation, you first call `useDeleteCutReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCutReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCutReviewMutation, { data, loading, error }] = useDeleteCutReviewMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCutReviewMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCutReviewMutation, DeleteCutReviewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCutReviewMutation, DeleteCutReviewMutationVariables>(DeleteCutReviewDocument, options);
      }
export type DeleteCutReviewMutationHookResult = ReturnType<typeof useDeleteCutReviewMutation>;
export type DeleteCutReviewMutationResult = Apollo.MutationResult<DeleteCutReviewMutation>;
export type DeleteCutReviewMutationOptions = Apollo.BaseMutationOptions<DeleteCutReviewMutation, DeleteCutReviewMutationVariables>;
export const LoginDocument = gql`
    mutation login($loginInput: LoginInput!) {
  login(loginInput: $loginInput) {
    errors {
      field
      message
    }
    user {
      id
      username
      email
    }
    accessToken
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      loginInput: // value for 'loginInput'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RefreshAccessTokenDocument = gql`
    mutation refreshAccessToken {
  refreshAccessToken {
    accessToken
  }
}
    `;
export type RefreshAccessTokenMutationFn = Apollo.MutationFunction<RefreshAccessTokenMutation, RefreshAccessTokenMutationVariables>;

/**
 * __useRefreshAccessTokenMutation__
 *
 * To run a mutation, you first call `useRefreshAccessTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshAccessTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshAccessTokenMutation, { data, loading, error }] = useRefreshAccessTokenMutation({
 *   variables: {
 *   },
 * });
 */
export function useRefreshAccessTokenMutation(baseOptions?: Apollo.MutationHookOptions<RefreshAccessTokenMutation, RefreshAccessTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RefreshAccessTokenMutation, RefreshAccessTokenMutationVariables>(RefreshAccessTokenDocument, options);
      }
export type RefreshAccessTokenMutationHookResult = ReturnType<typeof useRefreshAccessTokenMutation>;
export type RefreshAccessTokenMutationResult = Apollo.MutationResult<RefreshAccessTokenMutation>;
export type RefreshAccessTokenMutationOptions = Apollo.BaseMutationOptions<RefreshAccessTokenMutation, RefreshAccessTokenMutationVariables>;
export const SignUpDocument = gql`
    mutation signUp($signUpInput: SignUpInput!) {
  signUp(signUpInput: $signUpInput) {
    email
    username
    createdAt
    updatedAt
    id
  }
}
    `;
export type SignUpMutationFn = Apollo.MutationFunction<SignUpMutation, SignUpMutationVariables>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      signUpInput: // value for 'signUpInput'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: Apollo.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, options);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;
export const UploadProfileImageDocument = gql`
    mutation uploadProfileImage($file: Upload!) {
  uploadProfileImage(file: $file)
}
    `;
export type UploadProfileImageMutationFn = Apollo.MutationFunction<UploadProfileImageMutation, UploadProfileImageMutationVariables>;

/**
 * __useUploadProfileImageMutation__
 *
 * To run a mutation, you first call `useUploadProfileImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadProfileImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadProfileImageMutation, { data, loading, error }] = useUploadProfileImageMutation({
 *   variables: {
 *      file: // value for 'file'
 *   },
 * });
 */
export function useUploadProfileImageMutation(baseOptions?: Apollo.MutationHookOptions<UploadProfileImageMutation, UploadProfileImageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadProfileImageMutation, UploadProfileImageMutationVariables>(UploadProfileImageDocument, options);
      }
export type UploadProfileImageMutationHookResult = ReturnType<typeof useUploadProfileImageMutation>;
export type UploadProfileImageMutationResult = Apollo.MutationResult<UploadProfileImageMutation>;
export type UploadProfileImageMutationOptions = Apollo.BaseMutationOptions<UploadProfileImageMutation, UploadProfileImageMutationVariables>;
export const VoteDocument = gql`
    mutation vote($cutId: Int!) {
  vote(cutId: $cutId)
}
    `;
export type VoteMutationFn = Apollo.MutationFunction<VoteMutation, VoteMutationVariables>;

/**
 * __useVoteMutation__
 *
 * To run a mutation, you first call `useVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [voteMutation, { data, loading, error }] = useVoteMutation({
 *   variables: {
 *      cutId: // value for 'cutId'
 *   },
 * });
 */
export function useVoteMutation(baseOptions?: Apollo.MutationHookOptions<VoteMutation, VoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VoteMutation, VoteMutationVariables>(VoteDocument, options);
      }
export type VoteMutationHookResult = ReturnType<typeof useVoteMutation>;
export type VoteMutationResult = Apollo.MutationResult<VoteMutation>;
export type VoteMutationOptions = Apollo.BaseMutationOptions<VoteMutation, VoteMutationVariables>;
export const CutDocument = gql`
    query cut($cutId: Int!) {
  cut(cutId: $cutId) {
    id
    src
    film {
      id
      title
    }
    votesCount
    isVoted
  }
  cutReviews(cutId: $cutId) {
    id
    contents
    isMine
    user {
      username
      email
    }
  }
}
    `;

/**
 * __useCutQuery__
 *
 * To run a query within a React component, call `useCutQuery` and pass it any options that fit your needs.
 * When your component renders, `useCutQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCutQuery({
 *   variables: {
 *      cutId: // value for 'cutId'
 *   },
 * });
 */
export function useCutQuery(baseOptions: Apollo.QueryHookOptions<CutQuery, CutQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CutQuery, CutQueryVariables>(CutDocument, options);
      }
export function useCutLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CutQuery, CutQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CutQuery, CutQueryVariables>(CutDocument, options);
        }
export type CutQueryHookResult = ReturnType<typeof useCutQuery>;
export type CutLazyQueryHookResult = ReturnType<typeof useCutLazyQuery>;
export type CutQueryResult = Apollo.QueryResult<CutQuery, CutQueryVariables>;
export const CutsDocument = gql`
    query cuts($filmId: Int!) {
  cuts(filmId: $filmId) {
    id
    src
  }
}
    `;

/**
 * __useCutsQuery__
 *
 * To run a query within a React component, call `useCutsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCutsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCutsQuery({
 *   variables: {
 *      filmId: // value for 'filmId'
 *   },
 * });
 */
export function useCutsQuery(baseOptions: Apollo.QueryHookOptions<CutsQuery, CutsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CutsQuery, CutsQueryVariables>(CutsDocument, options);
      }
export function useCutsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CutsQuery, CutsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CutsQuery, CutsQueryVariables>(CutsDocument, options);
        }
export type CutsQueryHookResult = ReturnType<typeof useCutsQuery>;
export type CutsLazyQueryHookResult = ReturnType<typeof useCutsLazyQuery>;
export type CutsQueryResult = Apollo.QueryResult<CutsQuery, CutsQueryVariables>;
export const FilmDocument = gql`
    query film($filmId: Int!) {
  film(filmId: $filmId) {
    id
    title
    subtitle
    description
    genre
    runningTime
    posterImg
    release
    director {
      id
      name
    }
  }
}
    `;

/**
 * __useFilmQuery__
 *
 * To run a query within a React component, call `useFilmQuery` and pass it any options that fit your needs.
 * When your component renders, `useFilmQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFilmQuery({
 *   variables: {
 *      filmId: // value for 'filmId'
 *   },
 * });
 */
export function useFilmQuery(baseOptions: Apollo.QueryHookOptions<FilmQuery, FilmQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FilmQuery, FilmQueryVariables>(FilmDocument, options);
      }
export function useFilmLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FilmQuery, FilmQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FilmQuery, FilmQueryVariables>(FilmDocument, options);
        }
export type FilmQueryHookResult = ReturnType<typeof useFilmQuery>;
export type FilmLazyQueryHookResult = ReturnType<typeof useFilmLazyQuery>;
export type FilmQueryResult = Apollo.QueryResult<FilmQuery, FilmQueryVariables>;
export const FilmsDocument = gql`
    query Films($limit: Int, $cursor: Int) {
  films(limit: $limit, cursor: $cursor) {
    cursor
    films {
      id
      title
      subtitle
      runningTime
      director {
        name
      }
      release
      posterImg
    }
  }
}
    `;

/**
 * __useFilmsQuery__
 *
 * To run a query within a React component, call `useFilmsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFilmsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFilmsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useFilmsQuery(baseOptions?: Apollo.QueryHookOptions<FilmsQuery, FilmsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FilmsQuery, FilmsQueryVariables>(FilmsDocument, options);
      }
export function useFilmsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FilmsQuery, FilmsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FilmsQuery, FilmsQueryVariables>(FilmsDocument, options);
        }
export type FilmsQueryHookResult = ReturnType<typeof useFilmsQuery>;
export type FilmsLazyQueryHookResult = ReturnType<typeof useFilmsLazyQuery>;
export type FilmsQueryResult = Apollo.QueryResult<FilmsQuery, FilmsQueryVariables>;
export const MeDocument = gql`
    query me {
  me {
    id
    username
    email
    profileImage
    updatedAt
    createdAt
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const NotificationsDocument = gql`
    query notifications {
  notifications {
    id
    userId
    text
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useNotificationsQuery__
 *
 * To run a query within a React component, call `useNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNotificationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useNotificationsQuery(baseOptions?: Apollo.QueryHookOptions<NotificationsQuery, NotificationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NotificationsQuery, NotificationsQueryVariables>(NotificationsDocument, options);
      }
export function useNotificationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NotificationsQuery, NotificationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NotificationsQuery, NotificationsQueryVariables>(NotificationsDocument, options);
        }
export type NotificationsQueryHookResult = ReturnType<typeof useNotificationsQuery>;
export type NotificationsLazyQueryHookResult = ReturnType<typeof useNotificationsLazyQuery>;
export type NotificationsQueryResult = Apollo.QueryResult<NotificationsQuery, NotificationsQueryVariables>;
export const NewNotificationDocument = gql`
    subscription newNotification {
  newNotification {
    id
    userId
    text
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useNewNotificationSubscription__
 *
 * To run a query within a React component, call `useNewNotificationSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewNotificationSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewNotificationSubscription({
 *   variables: {
 *   },
 * });
 */
export function useNewNotificationSubscription(baseOptions?: Apollo.SubscriptionHookOptions<NewNotificationSubscription, NewNotificationSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<NewNotificationSubscription, NewNotificationSubscriptionVariables>(NewNotificationDocument, options);
      }
export type NewNotificationSubscriptionHookResult = ReturnType<typeof useNewNotificationSubscription>;
export type NewNotificationSubscriptionResult = Apollo.SubscriptionResult<NewNotificationSubscription>;