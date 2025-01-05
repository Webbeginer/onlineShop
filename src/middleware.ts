import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import withAuth from "./middlewares/withAuth";

export function mainMiddleware(req: NextRequest){
    const res= NextResponse.next();
}

export default withAuth(mainMiddleware, ["/about/profile", "/login", "/register"]);
