import * as Types from '../../../types/graphql';

import { useMutation, UseMutationOptions } from '@tanstack/react-query';

function fetcher<TData, TVariables>(query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch("http://localhost:5000/graphql", {
    method: "POST",
    ...({"headers":{"Content-Type":"application/json"}}),
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  }
}
export type RegisterMutationVariables = Types.Exact<{
  username: Types.Scalars['String']['input'];
  email: Types.Scalars['String']['input'];
  password: Types.Scalars['String']['input'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'Auth', token: string, user: { __typename?: 'User', id: string } } };



export const RegisterDocument = `
    mutation Register($username: String!, $email: String!, $password: String!) {
  register(username: $username, email: $email, password: $password) {
    token
    user {
      id
    }
  }
}
    `;

export const useRegisterMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<RegisterMutation, TError, RegisterMutationVariables, TContext>) => {
    
    return useMutation<RegisterMutation, TError, RegisterMutationVariables, TContext>(
      {
    mutationKey: ['Register'],
    mutationFn: (variables?: RegisterMutationVariables) => fetcher<RegisterMutation, RegisterMutationVariables>(RegisterDocument, variables)(),
    ...options
  }
    )};


useRegisterMutation.fetcher = (variables: RegisterMutationVariables) => fetcher<RegisterMutation, RegisterMutationVariables>(RegisterDocument, variables);
