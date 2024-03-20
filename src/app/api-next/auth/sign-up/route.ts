import { NextRequest, NextResponse } from 'next/server';

export interface IUserSignResponse {
  token: string;
  user: {
    id: number;
    email: string;
    createdAt: string;
    updatedAt: string;
    role: string[];
  };
}

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  const appBaseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!appBaseUrl) throw new Error('Missing NEXT_PUBLIC_API_URL');

  const res = await fetch(`${appBaseUrl}/auth/sign-up`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  const jsonRes: IUserSignResponse = await res.json();
  if (res.ok) {
    let response = NextResponse.next();

    const expireDate = new Date(Date.now() + 1000 * 60 * 60 * 24);
    const cookies = response.cookies.set({
      name: 'userToken',
      value: jsonRes.token,
      expires: expireDate,
      httpOnly: process.env.NODE_ENV === 'production',
      secure: process.env.NODE_ENV === 'production',
    });
    let roleResponse = NextResponse.next();
    const roleCookie = roleResponse.cookies.set({
      name: 'role',
      value: JSON.stringify(jsonRes.user.role),
      expires: expireDate,
      httpOnly: process.env.NODE_ENV === 'production',
      secure: process.env.NODE_ENV === 'production',
    });
    return NextResponse.json(jsonRes, {
      status: res.status,
      headers: { 'Set-cookie': String([cookies, roleCookie]) },
    });
  }

  return NextResponse.json(jsonRes, { status: res.status });
}
