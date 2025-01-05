
"use client";
import { useSession } from "next-auth/react";
const profilePage=()=>{
       const {data: session, status}= useSession();
    
    return(
        <div className="w-1/3 h-96 bg-stone-500 rounded-xl flex flex-col justify-center items-center">

            <p>profile</p>
            <p>name: { session?.user?.name}</p>
            <p>email: {session?.user?.email}</p>

        </div>
    )
}
 export default profilePage;