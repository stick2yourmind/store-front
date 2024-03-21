import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  let response = NextResponse.next();

  const expireDate = Date.now();
  const cookies = response.cookies.set({
    name: 'userToken',
    value: '',
    expires: expireDate,
    httpOnly: process.env.NODE_ENV === 'production',
    secure: true,
  });
  let roleResponse = NextResponse.next();
  const roleCookie = roleResponse.cookies.set({
    name: 'role',
    value: '',
    expires: expireDate,
    httpOnly: process.env.NODE_ENV === 'production',
    secure: process.env.NODE_ENV === 'production',
  });
  return NextResponse.json(
    { success: true },
    {
      status: 200,
      headers: { 'Set-cookie': String([cookies, roleCookie]) },
    },
  );
}
