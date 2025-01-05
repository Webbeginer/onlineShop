import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
export async function POST(req: NextRequest) {
    const tags= req.nextUrl.searchParams.get("tags");
    const secret= req.nextUrl.searchParams.get("secret");
    
    if(!tags){
        return NextResponse.json({ status: 400, message: "tags not found" } ,{ status: 400 });
    }
    if(secret !== "4321"){
        return NextResponse.json({status: 401, message: " wrong scret token"})
    }
    revalidateTag(tags);
    return NextResponse.json({ status: 200, message: "revalidate success", now: Date.now() });
}