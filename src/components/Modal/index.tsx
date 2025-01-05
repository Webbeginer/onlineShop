"use client";
import { useRouter } from "next/navigation";
import { MouseEventHandler, useRef } from "react";

const ModalLayout = ({children}: {children: React.ReactNode}) => {
    const router = useRouter();
    const overlay= useRef(null);
    const close: MouseEventHandler=(e) =>{
        if(e.target === overlay.current){
            router.back();
        }
    }
    return(
        <>
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/50 z-10 cursor-pointer flex justify-center items-center" onClick={close} ref={overlay} >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-gray-200 rounded-md bg-transparent backdrop-blur-md md:w-[400px] md:h-[500px]">{children}</div>
        </div>
        </>
    )
}
export default ModalLayout;
