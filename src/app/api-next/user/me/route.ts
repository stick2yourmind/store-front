import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const userToken = request.cookies.get('userToken')?.value || '';

  const appBaseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!appBaseUrl) throw new Error('Missing NEXT_PUBLIC_API_URL');

  const res = await fetch(`${appBaseUrl}/user/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
    cache: 'no-store',
  });

  const jsonRes = await res.json();
  return NextResponse.json(jsonRes, {
    status: res.status,
  });
}
