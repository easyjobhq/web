import { NextRequest, NextResponse } from "next/server";
import cookie from "cookie";
import jwt from 'jsonwebtoken';

export function middleware(req: NextRequest) {
  const cookies = cookie.parse(req.headers.get("Cookie") || "");
  const token = cookies.token;
  const tokenFromOauth = req.cookies.get("token");

  let tokenData;

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
