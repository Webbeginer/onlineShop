import { getData } from "@/services/product/getData";
import Link from "next/link";
import DetailProductPage from "./detail/[id]/page";


type DetailProductProps={
    params:{slug:string[]}
    
}
 
const ProductPage= async ( props:DetailProductProps)=>{

    const products= await getData( `${process.env.NEXT_PUBLIC_API}/api/product`);
 
    return(
       
        <>
        <div className="w-full flex justify-center items-center mt-[110px]">
            <div className="flex flex-wrap gap-4 justify-center">
                {products.data.map((item: any) => (
                <div
                    className="w-96 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                    key={item.id}
                >
                    <Link href={`/product/detail/${item.id}`}>
                    <img
                        className="p-8 rounded-t-lg object-cover h-64 w-full"
                        src={item.image}
                        alt="product image"
                    />
                    </Link>
                    <div className="px-5 pb-5">
                    
                        <h5 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                        {item?.name}
                        </h5>
                   
                    <div className="flex flex-col items-start">
                        <p className="text-base text-gray-700 dark:text-white mb-4">
                        {item.type}
                        </p>
                        <div className="flex items-center justify-between w-full">
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            {item.price.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}
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
                </div>
                ))}
            </div>
        </div>

        </>
    )
}

export default ProductPage