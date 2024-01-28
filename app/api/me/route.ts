import {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  ROLES,
  USER_ID,
} from '@/constrant/cookiesName';
import { User } from '@/context/userContext';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export function GET(req: NextRequest) {
  const userId = req.cookies.get(USER_ID)?.value;
  const roles = req.cookies.get(ROLES)?.value;
  const accessToken = req.cookies.get(ACCESS_TOKEN)?.value;
  const refreshToken = req.cookies.get(REFRESH_TOKEN)?.value;

  if (!userId || !roles || !accessToken || !refreshToken)
    return NextResponse.json({});

  const userInfor: User = {
    userId,
    roles,
  };
  return NextResponse.json(userInfor);
}
