import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server";

const onlyAdmin= ["/about/profile/admin"];
const auth= ["/login", "/register"];
export default function withAuth(middleware: NextMiddleware, requireAuth: string[]= []){
    return async (req: NextRequest, next: NextFetchEvent)=>{
        const pathname= req.nextUrl.pathname;
        if(requireAuth.includes(pathname)) {
            const token= await getToken({req, secret: process.env.NEXT_AUTH_SECRET});
            if(!token && !auth.includes(pathname)) {
                const url= new URL("/login",req.url);
                url.searchParams.set("callbackUrl", req.url);
                return NextResponse.redirect(url);
            }
            if(token && auth.includes(pathname)) {
                return NextResponse.redirect(new URL("/", req.url));
            }
            if(token){
                if(auth.includes(pathname)){
                    return NextResponse.redirect(new URL("/", req.url));
                }
                if(onlyAdmin.includes(pathname) && token.role !== "admin") {
                    return NextResponse.redirect(new URL("/", req.url));
                }
            }
        }
        return middleware(req, next);
    }
}