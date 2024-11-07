import { NextRequest, NextResponse } from "next/server";
import cookie from "cookie";
import jwt from 'jsonwebtoken';
import { TbBookmarkQuestion } from "react-icons/tb";
import { useGlobalContext } from '@/context/store';
import { Client } from "./interfaces/Client";
import { authService } from "./services";
import { checkService } from "./services";
interface current {
  name: string,
  value: string
}

interface user{
  id:string,
  email: string,
  password:string,
  token: string
}

export function Pid(req: NextRequest){
  const currentUser =  JSON.parse(JSON.stringify( req.cookies.get('currentUser'))) as current
  const tokenn =JSON.parse(currentUser.value) as user
  return tokenn.id
}

export async function middleware(req: NextRequest) {
  const cookies = cookie.parse(req.headers.get("Cookie") || "");
  const token = cookies.currentUser;
  const tokenFromOauth = req.cookies.get("currentUser");


  /*
  if (
    !token &&
    !tokenFromOauth &&
    req.nextUrl.pathname.startsWith("/home")
  ) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
    */

  
  
  /*

  if(req.nextUrl.pathname.startsWith('/profile')){
    const currentUser =  JSON.parse(JSON.stringify( tokenFromOauth)) as current
    const tokenn =JSON.parse(currentUser.value) as user
    const isClient = await checkService.checkIsClient(tokenn.id)
    if(isClient)
      return NextResponse.redirect(new URL('/home', req.url))
  }
    */

  if (req.nextUrl.pathname.startsWith("/oauth")) {
    const oAuthToken = req.nextUrl.searchParams.get("token") || "";
    const oAuthid = req.nextUrl.searchParams.get("id") || ""
    const oAuthEmail = req.nextUrl.searchParams.get("email") || ""

    const tokenData = jwt.decode(oAuthToken);

    const current = {
      id: oAuthid,
      email:oAuthEmail,
      token:oAuthToken
    }


    if (oAuthToken.length > 0) {
      const response = NextResponse.redirect(new URL("/home", req.url));

      response.cookies.set({
        name: "currentUser",
        value: JSON.stringify(current),
        maxAge: 60 * 60 * 24 * 7,
      });
      return response;
    }
  }

  return NextResponse.next();
}
