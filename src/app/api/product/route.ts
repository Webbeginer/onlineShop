import { retriveData, retriveDataByID } from "@/services/utils/firebase/service";
import { NextRequest, NextResponse } from "next/server";

// di dalam app next js kita bisa menggabungkan api product dan detail product



export async function GET(req: NextRequest) {
  const id= req.nextUrl.searchParams.get("id")
  if(id) {
    const detailProduct= await retriveDataByID("products", id);
    if(!detailProduct) {
        return NextResponse.json({status: 404, message: "product not found"});
    }
    return NextResponse.json({status: 200, mesage: "success", data: detailProduct});
    
  }
  const data= await retriveData("products");
  return NextResponse.json({status: 200, mesage: "success", data});
}