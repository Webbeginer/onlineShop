import { getData } from "@/services/product/getData";


const DetailProductPage= async (props: any)=>{
    const {params}= props;
    const product = await getData(`${process.env.NEXT_PUBLIC_API}/api/product?id=${params.id}`);

    return(
        <div className="w-full flex justify-center items-center  ">

            <div
                className="w-[450px] h-[550px] max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                key={product.data.id}
            >
                <div className="w-[370px] h-[300px] p mx-auto mt-4 rounded-lg group overflow-hidden">

                <img
                    className="p-8  object-cover group-hover:scale-110  transition duration-500 ease-in-out group-hover:rotate-3 object-cover h-full w-full"
                    src={product.data?.image}
                    alt="product image"
                />
                </div>
               
                <div className="px-5 pb-5">
                
                    <h5 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {product.data.title}
                    </h5>
               
                <div className="flex items-center ml-[10px] mt-2.5 mb-2">
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
                    rate: {product.data.rating?.rate}
                    </span>
                </div>
                <div className="flex flex-col items-start ml-[20px]">
                    <p className="text-base text-gray-900 dark:text-white mb-4">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet sequi totam minus. Aspernatur nihil sint nobis quod perferendis itaque culpa?
                    </p>
                    <div className="flex items-center justify-between w-full">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {product.data.price.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}
                    </p>
                    <a
                        href="#"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        buy
                    </a>
                    </div>
                </div>
                </div>
            </div>
    
        </div>

    )
}

export default DetailProductPage;