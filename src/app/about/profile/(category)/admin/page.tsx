"use client"
import { useState } from "react";
const AdminPage= ()=>{
    const [status, setStatus]= useState("");
    const revalidate= async()=>{
        const res= await fetch('/api/revalidate?tags=update&secret=4321', { method: 'POST' });
       const response= await res.json();
        console.log(response);
        if(response.status === 200){
            setStatus("revalidate success");
        }if(response.status === 401){
            setStatus("wrong secret token");
        }
       return res
    }
    return(
        <div className="w-full justify-center">
            <h1 className="m-4">Admin Page</h1>
            <div className=" m-4">
            <p className="mb-4">revalidate product</p>
            <p className="mb-4">{status}</p>
            <button className="bg-stone-600 text-white p-4 rounded-md hover:bg-stone-700" onClick={revalidate}>revalidate</button>
            </div>
        </div>
    )
}
export default AdminPage;