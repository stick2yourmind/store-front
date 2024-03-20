import { IProductCart } from '@/store/cart.store';

export async function checkoutOrder(cart: IProductCart[]) {
  try {
    const frontBaseUrl = process.env.NEXT_PUBLIC_FRONT_APP_BASE_URL;
    if (!frontBaseUrl) throw new Error('Missing NEXT_PUBLIC_FRONT_APP_BASE_URL');
    const res = await fetch(`${frontBaseUrl}/api-next/order`, {
      method: 'POST',
      body: JSON.stringify({ products: cart }),
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
