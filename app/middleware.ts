import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { fetchUserFromStrapi } from "./actions/services/verify-token";
 // Function to validate token

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  // Extract the token from cookies
  const token = req.cookies.get("authToken")?.value; // Get token from cookies

  console.log("Token received in middleware:", token);

  // Protect dashboard routes
  if (pathname.startsWith("/dashboard")) {
    // Redirect to login if no token is found
    if (!token) {
      console.log("No token found. Redirecting to login.");
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Validate the token with Strapi
    const isValid = await fetchUserFromStrapi(token);

    // Redirect to login if token is invalid
    if (!isValid) {
      console.log("Invalid token. Redirecting to login.");
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // Allow other requests to proceed
  return NextResponse.next();
}


  
