// import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

// import { NextResponse } from "next/server";

// export async function middleware(request) {
//   const { isAuthenticated } = getKindeServerSession();

//   if (!(await isAuthenticated())) {
//     return NextResponse.redirect(
//       new URL("/api/auth/login?post_login_redirect_url=/dashboard", request.url)
//     );
//   }
// }

// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: "/dashboard/:path*",
// };

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function middleware(request) {
  // Pass the request object to getKindeServerSession
  const { isAuthenticated } = await getKindeServerSession(request);

  if (!(await isAuthenticated())) {
    return NextResponse.redirect(
      new URL("/api/auth/login?post_login_redirect_url=/dashboard", request.url)
    );
  }

  return NextResponse.next(); // Allow access if authenticated
}

// Match the dashboard route and any sub-paths
export const config = {
  matcher: "/dashboard/:path*",
};
