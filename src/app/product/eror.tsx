import { useEffect } from "react";

export default function Erore({error, reset} :{error: Error, reset:()=>void}) {
    useEffect(()=>{
        console.log(error);
    }, [error])
    return (
        <div className="w-full h-screen flex justify-center items-center mt-[110px]">
            <h1 className="text-2xl text-red-500">something went wrong</h1>
        </div>
    );
}