export interface ISignIn {
  password: string;
  email: string;
}
export async function sigIn({ email, password }: ISignIn) {
  try {
    const res = await fetch('/api-next/auth/sign-in', {
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
