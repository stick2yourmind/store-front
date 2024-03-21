import { cookies } from 'next/headers';

export interface IProfileRes {
  id: number;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export async function fetchProfile(): Promise<IProfileRes | null> {
  const token = cookies().get('userToken')?.value;
  console.log('🚀 ~ file: getProfile.service.ts:12 ~ fetchProfile ~ token:', token);
  const frontBaseUrl = process.env.NEXT_PUBLIC_FRONT_APP_BASE_URL;

  if (!frontBaseUrl) throw new Error('Missing NEXT_PUBLIC_FRONT_APP_BASE_URL');
  const res = await fetch(`${frontBaseUrl}/api-next/user/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Cookie: cookies().toString(),
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  });

  if (!res.ok) return null;
  return await res.json();
}
