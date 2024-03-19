import { cookies } from 'next/headers';

export interface IOrder {
  createdAt: string;
  userId: number;
  id: number;
  isApproved: boolean;
  total: number;
  updatedAt: string;
}

export async function fetchApprovedOrders(): Promise<IOrder[] | null> {
  const token = cookies().get('userToken')?.value;
  const frontBaseUrl = process.env.NEXT_PUBLIC_FRONT_APP_BASE_URL;

  if (!frontBaseUrl) throw new Error('Missing NEXT_PUBLIC_FRONT_APP_BASE_URL');
  const res = await fetch(`${frontBaseUrl}/api-next/order`, {
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
