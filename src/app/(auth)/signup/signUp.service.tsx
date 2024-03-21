export interface ISignUp {
  password: string;
  email: string;
}

export async function signUp({ email, password }: ISignUp) {
  try {
    const res = await fetch('/api-next/auth/sign-up', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      credentials: 'include',
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }

    return data;
  } catch (e) {
    throw e;
  }
}
