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

export type Admin = {
  __typename?: 'Admin';
  access_token: Maybe<Scalars['String']>;
  email: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
  role: Role;
};

export type CreateOwnerInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};

export type CreatePetInput = {
  name: Scalars['String'];
  ownerId: Scalars['Int'];
  type?: InputMaybe<Scalars['String']>;
};

export type LoginAdminInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  access_token: Scalars['String'];
  owner: Owner;
};

export type LoginUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LogoutInput = {
  email: Scalars['String'];
};

export type LogoutOutput = {
  __typename?: 'LogoutOutput';
  message: Scalars['String'];
};

export type MetaInfo = {
  __typename?: 'MetaInfo';
  currentPage: Scalars['Int'];
  itemCount: Scalars['Int'];
  itemsPerPage: Scalars['Int'];
  totalItems: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  adminLogin: Admin;
  adminLogout: LogoutOutput;
  createPet: Pet;
  login: LoginResponse;
  logout: LogoutOutput;
  removeOwner: Scalars['String'];
  signup: Owner;
};


export type MutationAdminLoginArgs = {
  loginAdminInput: LoginAdminInput;
};


export type MutationAdminLogoutArgs = {
  logoutInput: LogoutInput;
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
  email: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
  pets: Maybe<Array<Pet>>;
  role: Role;
};

export type OwnerPaginateOutput = {
  __typename?: 'OwnerPaginateOutput';
  items: Array<Owner>;
  meta: MetaInfo;
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
  currentAdmin: Admin;
  getOneAdmin: Admin;
  getOwner: Owner;
  getPet: Pet;
  me: Owner;
  ownerPaginate: OwnerPaginateOutput;
  owners: Array<Owner>;
  pets: Array<Pet>;
};


export type QueryGetOneAdminArgs = {
  email: Scalars['String'];
};


export type QueryGetOwnerArgs = {
  username: Scalars['String'];
};


export type QueryGetPetArgs = {
  id: Scalars['Int'];
};


export type QueryOwnerPaginateArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
};

export enum Role {
  Admin = 'ADMIN',
  User = 'USER'
}

export type AdminLoginMutationVariables = Exact<{
  input: LoginAdminInput;
}>;


export type AdminLoginMutation = { __typename?: 'Mutation', adminLogin: { __typename?: 'Admin', id: number, name: string, email: string, access_token: string | null, role: Role } };

export type AdminLogoutMutationVariables = Exact<{
  input: LogoutInput;
}>;


export type AdminLogoutMutation = { __typename?: 'Mutation', adminLogout: { __typename?: 'LogoutOutput', message: string } };

export type SignupMutationVariables = Exact<{
  input: CreateOwnerInput;
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: { __typename?: 'Owner', id: number, name: string, email: string, role: Role } };

export type LoginMutationVariables = Exact<{
  input: LoginUserInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', access_token: string, owner: { __typename?: 'Owner', id: number, name: string, email: string } } };

export type LogoutMutationVariables = Exact<{
  input: LogoutInput;
}>;


export type LogoutMutation = { __typename?: 'Mutation', logout: { __typename?: 'LogoutOutput', message: string } };

export type GetCurrentAdminQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentAdminQuery = { __typename?: 'Query', currentAdmin: { __typename?: 'Admin', id: number, name: string, email: string, access_token: string | null, role: Role } };

export type GetOwnersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOwnersQuery = { __typename?: 'Query', owners: Array<{ __typename?: 'Owner', id: number, name: string }> };

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', me: { __typename?: 'Owner', id: number, name: string, email: string, access_token: string | null } };

export type OwnerPaginateQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
}>;


export type OwnerPaginateQuery = { __typename?: 'Query', ownerPaginate: { __typename?: 'OwnerPaginateOutput', items: Array<{ __typename?: 'Owner', id: number, name: string, email: string }>, meta: { __typename?: 'MetaInfo', itemCount: number, totalItems: number, itemsPerPage: number, totalPages: number, currentPage: number } } };


export const AdminLoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"adminLogin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginAdminInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminLogin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"loginAdminInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"access_token"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]} as unknown as DocumentNode<AdminLoginMutation, AdminLoginMutationVariables>;
export const AdminLogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"adminLogout"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LogoutInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminLogout"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"logoutInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<AdminLogoutMutation, AdminLogoutMutationVariables>;
export const SignupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"signup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateOwnerInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"signupUserInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]} as unknown as DocumentNode<SignupMutation, SignupMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"loginUserInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"access_token"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"logout"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LogoutInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"logoutInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const GetCurrentAdminDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getCurrentAdmin"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentAdmin"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"access_token"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]} as unknown as DocumentNode<GetCurrentAdminQuery, GetCurrentAdminQueryVariables>;
export const GetOwnersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getOwners"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"owners"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetOwnersQuery, GetOwnersQueryVariables>;
export const GetCurrentUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getCurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"access_token"}}]}}]}}]} as unknown as DocumentNode<GetCurrentUserQuery, GetCurrentUserQueryVariables>;
export const OwnerPaginateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ownerPaginate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ownerPaginate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"itemCount"}},{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"itemsPerPage"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}}]}}]}}]}}]} as unknown as DocumentNode<OwnerPaginateQuery, OwnerPaginateQueryVariables>;