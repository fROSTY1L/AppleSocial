import * as Types from '../../../types/graphql';

import { useMutation, UseMutationOptions } from '@tanstack/react-query';

function fetcher<TData, TVariables>(query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch('http://localhost:5000/graphql', {
      method: 'POST',
      ...{ headers: { 'Content-Type': 'application/json' } },
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  };
}
export type LoginMutationVariables = Types.Exact<{
  email: Types.Scalars['String']['input'];
  password: Types.Scalars['String']['input'];
}>;

export type LoginMutation = {
  __typename?: 'Mutation';
  login: { __typename?: 'Auth'; token: string };
};

export const LoginDocument = `
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
  }
}
    `;

export const useLoginMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    LoginMutation,
    TError,
    LoginMutationVariables,
    TContext
  >
) => {
  return useMutation<LoginMutation, TError, LoginMutationVariables, TContext>({
    mutationKey: ['Login'],
    mutationFn: (variables?: LoginMutationVariables) =>
      fetcher<LoginMutation, LoginMutationVariables>(
        LoginDocument,
        variables
      )(),
    ...options,
  });
};

useLoginMutation.fetcher = (variables: LoginMutationVariables) =>
  fetcher<LoginMutation, LoginMutationVariables>(LoginDocument, variables);
