import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  let response = NextResponse.next();
  // Set a cookie to hide the banner
  const cookies = response.cookies.set({
    name: 'userToken',
    value: '',
    expires: Date.now(),
    httpOnly: process.env.NODE_ENV === 'production',
    secure: true,
  });
  return NextResponse.json(
    { success: true },
    {
      status: 200,
      headers: { 'Set-cookie': cookies.toString() },
    },
  );
}
