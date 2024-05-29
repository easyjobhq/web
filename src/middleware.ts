import { NextRequest, NextResponse } from "next/server";
import cookie from "cookie";
import jwt from 'jsonwebtoken';
import { TbBookmarkQuestion } from "react-icons/tb";

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

export function middleware(req: NextRequest) {
  const cookies = cookie.parse(req.headers.get("Cookie") || "");
  const token = cookies.token;
  const tokenFromOauth = req.cookies.get("token");

 

  if (req.nextUrl.pathname.startsWith("/oauth")) {
    const oAuthToken = req.nextUrl.searchParams.get("token") || "";

    const tokenData = jwt.decode(oAuthToken);
    console.log(tokenData);

    if (oAuthToken.length > 0) {
      const response = NextResponse.redirect(new URL("/home", req.url));

      response.cookies.set({
        name: "token",
        value: JSON.stringify(oAuthToken),
        maxAge: 60 * 60 * 24 * 7,
      });

      response.cookies.delete("currentUser")

      return response;
    }
  }

  return NextResponse.next();
}
