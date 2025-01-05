import { register } from "@/services/utils/firebase/service";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
    const response= await req.json();
    const result= await register(response);
    return NextResponse.json({status: result.statusCode, message: result.message});
    
}