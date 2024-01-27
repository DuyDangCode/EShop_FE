import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export function GET(req: NextRequest) {
  const cookieStorage = cookies();
  const userId = cookieStorage.get('userId')?.value;
  const roles = cookieStorage.get('roles')?.value;
  return NextResponse.json({
    userId,
    roles,
  });
}
