import { NextRequest, NextResponse } from 'next/server'
import { checkUserInRequest } from './actions/user'
import { pathHelper } from './helper/router'

export function middleware(req: NextRequest) {
  const pathName = req.nextUrl.pathname

  //Only pages that users are not logged in can access
  if (
    pathName.endsWith(pathHelper.signin()) ||
    pathName.endsWith(pathHelper.signup())
  ) {
    if (checkUserInRequest(req))
      return NextResponse.redirect(new URL(pathHelper[404](), req.url))
  }

  //Only logged in users can access the page

  //   if (pathName.endsWith('/signin') || pathName.endsWith('/signup')) {
  //     if (checkUserInRequest(req))
  //       return NextResponse.redirect(new URL(pathHelper.home(), req.url));
  //   }
}
