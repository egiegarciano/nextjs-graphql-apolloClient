import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CreateOwnerInput = {
  name: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type CreatePetInput = {
  name: Scalars['String'];
  ownerId: Scalars['Int'];
  type?: InputMaybe<Scalars['String']>;
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  access_token: Scalars['String'];
  owner: Owner;
};

export type LoginUserInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type LogoutInput = {
  username: Scalars['String'];
};

export type LogoutOutput = {
  __typename?: 'LogoutOutput';
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createOwner: Owner;
  createPet: Pet;
  login: LoginResponse;
  logout: LogoutOutput;
  removeOwner: Owner;
  signup: Owner;
};


export type MutationCreateOwnerArgs = {
  createOwnerInput: CreateOwnerInput;
};


export type MutationCreatePetArgs = {
  createPetInput: CreatePetInput;
};


export type MutationLoginArgs = {
  loginUserInput: LoginUserInput;
};


export type MutationLogoutArgs = {
  logoutInput: LogoutInput;
};


export type MutationRemoveOwnerArgs = {
  id: Scalars['Int'];
};


export type MutationSignupArgs = {
  signupUserInput: CreateOwnerInput;
};

export type Owner = {
  __typename?: 'Owner';
  access_token: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name: Scalars['String'];
  pets: Maybe<Array<Pet>>;
  username: Scalars['String'];
};

export type Pet = {
  __typename?: 'Pet';
  id: Scalars['Int'];
  name: Scalars['String'];
  owner: Maybe<Owner>;
  ownerId: Maybe<Scalars['Int']>;
  type: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  getOwner: Owner;
  getPet: Pet;
  owners: Array<Owner>;
  pets: Array<Pet>;
};


export type QueryGetOwnerArgs = {
  username: Scalars['String'];
};


export type QueryGetPetArgs = {
  id: Scalars['Int'];
};

export type CreateOwnerMutationVariables = Exact<{
  input: CreateOwnerInput;
}>;


export type CreateOwnerMutation = { __typename?: 'Mutation', createOwner: { __typename?: 'Owner', id: number, name: string } };

export type LoginMutationVariables = Exact<{
  input: LoginUserInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', access_token: string, owner: { __typename?: 'Owner', id: number, name: string, username: string } } };

export type LogoutMutationVariables = Exact<{
  input: LogoutInput;
}>;


export type LogoutMutation = { __typename?: 'Mutation', logout: { __typename?: 'LogoutOutput', message: string } };

export type GetOwnersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOwnersQuery = { __typename?: 'Query', owners: Array<{ __typename?: 'Owner', id: number, name: string }> };


export const CreateOwnerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createOwner"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateOwnerInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOwner"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createOwnerInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateOwnerMutation, CreateOwnerMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"loginUserInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"access_token"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"logout"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LogoutInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"logoutInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const GetOwnersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getOwners"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"owners"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetOwnersQuery, GetOwnersQueryVariables>;