import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { NextRequest } from "next/server";

export default withAuth(
    async function middleware(request: NextRequest) {
        //console.log("requests log", request)
    }, {
    isReturnToCurrentPage: true
}
)

export const config = {
    matcher: [
        /**
         * Match all the requset paths except for ones starting with:
         * - api (Api routes)
         * - _next/static (static files)
         * - _next/images (image optimization files)
         * - Auth
         * - favicon
         * - robots.txt
         * - images
         * - login
         * - homepage (represented with $ after beginning)
         * 
         */
        '/((?!api|_next/static|_next/image|auth|favicon.ico|robots.txt|images|login|$).*)'
    ]
}