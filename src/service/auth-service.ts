import { FetchApi } from './fetch-service';

export interface Auth {
  token: string;
  user: {
    id: number;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

export interface ISignIn {
  email: string;
  password: string;
}

export interface ISignUp extends ISignIn {}

const fetchApi = new FetchApi(process.env.NEXT_PUBLIC_API_URL || '');

class AuthService {
  async signIn({ email, password }: ISignIn) {
    return await fetchApi.post<Auth>({
      pathname: '/sign-in',
      body: { email, password },
      init: {
        credentials: 'include',
      },
    });
  }

  async signUp({ email, password }: ISignUp) {
    return await fetchApi.post<Auth>({
      pathname: '/sign-up',
      body: { email, password },
      init: {
        credentials: 'include',
      },
    });
  }

  async signOut() {
    return await fetchApi.post<Auth>({
      pathname: '/sign-out',
      init: {
        credentials: 'include',
      },
    });
  }
}

export const authService = new AuthService();
