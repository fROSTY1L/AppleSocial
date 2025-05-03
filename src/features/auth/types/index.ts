import { createContext } from 'react';
import { RegisterMutationVariables } from '../api/Register.generated';
import { LoginMutationVariables } from '../api/Login.generated';

type AuthContextType = {
  token: string | null;
  setAuthToken: (token: string) => void;
  clearAuth: () => void;
};

type LoginFormValues = LoginMutationVariables & {
  remember: boolean;
};

type RegisterFormValues = RegisterMutationVariables & {
  remember: boolean;
};

export type AuthFormValues = LoginFormValues | RegisterFormValues;

export const AuthContext = createContext<AuthContextType | null>(null);
