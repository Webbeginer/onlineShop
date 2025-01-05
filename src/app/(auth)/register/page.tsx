"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
const RegisterPage= ()=>{
    const [loading, setLoading]= useState(false);
    const [error, setEror]= useState("");
    const {push}= useRouter();
    const handleSubmit= async(e: React.FormEvent<HTMLFormElement>)=>{
     e.preventDefault();
     setLoading(true);
     const form= e.target as HTMLFormElement;
     const resultForm= await fetch("/api/auth/register", {
     method: "POST",
     body: JSON.stringify({
         email: (form.elements.namedItem("email") as HTMLInputElement).value,
         name: (form.elements.namedItem("name") as HTMLInputElement).value,
         password: (form.elements.namedItem("password") as HTMLInputElement).value
     }),
     });
     const response= await resultForm.json();
     try{
        if(response.status === 200){
            setLoading(false);
            form.reset();
            push("/login");
        }else{
            setLoading(false);
            setEror(response.message);
        }
     }catch(error){
         setLoading(false);
         setEror("something went wrong");
     }
     }
    return(
        <>
           <div className="w-full h-screen flex justify-center items-center bg-gray-100">
            <div className="w-full max-w-sm p-4 backdrop-sepia-0 bg-white/30 border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 flex flex-col ">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">Sign Up </h1>
                <p className="text-1xl text-red-500">{error !== "" && error}</p>
            <form onSubmit={handleSubmit} >
                
                {/* email */}
                <label htmlFor="email" className="text-base mt-4 block">Email</label>
                <input type="email" placeholder=" email@example.com"  name="email"  className="mt-2 px-2 w-full py-3 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-stone-500 focus:border-stone-500"/>
               
                {/* username */}
                <label htmlFor="name" className="text-base mt-4 block">Username</label>
                <input type="text" placeholder=" username"  name="name"  className="mt-2 px-2 w-full py-3 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-stone-500 focus:border-stone-500"/>

                {/* password */}
                <label htmlFor="password" className="text-base mt-4 block">Password</label>
                <input type="password" placeholder=" password"  name="password"  className="mt-2 px-2 w-full py-3 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-stone-500 focus:border-stone-500 "/>

                {/* button */}
                <button type="submit" className="mt-4 mb-2 w-full text-white bg-stone-500 hover:bg-stone-600 focus:ring-4 focus:outline-none focus:ring-stone-300 font-medium rounded-lg text-sm px-5 py-4 text-center">{loading ? "loading..." : "Sign Up"}</button>
            </form>
            <p className="mt-2 mb-2 text-center">already have an account ? <Link href="/login" className="text-stone-500">Sign In</Link></p>
            </div>
           </div>
        </>
    )
}
export default RegisterPage;