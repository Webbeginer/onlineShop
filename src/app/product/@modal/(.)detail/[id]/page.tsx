import ModalLayout from "@/components/Modal"
import { getData } from "@/services/product/getData";
import Image from "next/image";

const Modal = async (props: any) => {
    const { params } =  props;
    const product = await getData(`${process.env.NEXT_PUBLIC_API}/api/product?id=${params.id}`);
    
    return (
        <ModalLayout>
          
                <div className="h-[300px] w-[300px] overflow-hidden group mx-auto mt-4 rounded-lg ">
                <Image
                    className=" object-cover group-hover:scale-110  transition duration-500 ease-in-out object-cover h-full w-full"
                    src={product.data.image} width={200} height={200}
                    alt="product image"
                />
                </div>
               
                <div className="px-5 pb-5">
                
                    <h5 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {product.data.title}
                    </h5>
               
                <div className="flex items-center ml-4 mt-2.5 mb-2">
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
                    rate: {product.data.rating?.rate}
                    </span>
                </div>
                <div className="flex flex-col items-start ml-[30px]">
                    <p className="text-base text-white dark:text-white mb-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa dignissimos odio aliquid.
                    </p>
                    <div className="flex items-center justify-between w-full">
                    <p className="text-2xl font-bold text-white dark:text-white">
                        {product.data.price.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}
                    </p>
                    <a
                        href="https://www.nike.com/id/w/mens-shoes-nik1zy7ok"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        buy
                    </a>
                    </div>
                </div>
                </div>
       
        </ModalLayout>
    )
}
export default Modal;