import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { products } = await request.json();
  const userToken = request.cookies.get('userToken')?.value || '';

  const appBaseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!appBaseUrl) throw new Error('Missing NEXT_PUBLIC_API_URL');

  try {
    const res = await fetch(`${appBaseUrl}/order`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${userToken}`,
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({ products }),
      cache: 'no-store',
    });

    const jsonRes = await res.json();

    return NextResponse.json(jsonRes, {
      status: res.status,
    });
  } catch (error) {
    console.log('🚀 ~ file: route.ts:23 ~ POST ~ error:', error);
  }
}

export async function GET(request: NextRequest) {
  const userToken = request.cookies.get('userToken')?.value || '';
  const appBaseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!appBaseUrl) throw new Error('Missing NEXT_PUBLIC_API_URL');

  const res = await fetch(`${appBaseUrl}/order`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${userToken}`,
      'Content-type': 'application/json; charset=UTF-8',
    },
    cache: 'no-store',
  });

  const jsonRes = await res.json();
  return NextResponse.json(jsonRes, {
    status: res.status,
  });
}
