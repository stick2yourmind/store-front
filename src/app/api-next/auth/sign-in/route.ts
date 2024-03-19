import { NextRequest, NextResponse } from 'next/server';

export interface ICustomerSignResponse {
  token: string;
  customer: {
    id: number;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
}

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  const appBaseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!appBaseUrl) throw new Error('Missing NEXT_PUBLIC_API_URL');

  const res = await fetch(`${appBaseUrl}/auth/sign-in`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  const jsonRes: ICustomerSignResponse = await res.json();
  if (res.ok) {
    let response = NextResponse.next();
    // Set a cookie to hide the banner
    const cookies = response.cookies.set({
      name: 'userToken',
      value: jsonRes.token,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      httpOnly: process.env.NODE_ENV === 'production',
      secure: process.env.NODE_ENV === 'production',
    });
    return NextResponse.json(jsonRes, {
      status: res.status,
      headers: { 'Set-cookie': cookies.toString() },
    });
  }

  return NextResponse.json(jsonRes, { status: res.status });
}
