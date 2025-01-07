"use client";

import Image from "next/image";
import useSWR from "swr";
import { useParams } from "next/navigation";
import LoadingDetail from "@/components/Layout/LoadingDetail";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const DetailProductPage = () => {
  // Gunakan useParams untuk mendapatkan parameter dari URL
  const params = useParams();
  const apiUrl = process.env.NEXT_PUBLIC_API;

  // Gunakan useSWR untuk mengambil data produk berdasarkan ID
  const { data, error, isLoading } = useSWR(
    `${apiUrl}/api/product?id=${params?.id}`,
    fetcher
  );

  // Error handling
  if (error) return <div>Failed to load</div>;

  // Loading state
  if (isLoading || !data) return <LoadingDetail/>;

  // Fallback untuk data produk jika tidak tersedia

  const product = data.data;

  return (
    <div className="w-full flex justify-center items-center">
      <div
        className="w-[500px] h-[600px] max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        key={product.id}
      >
        <div className="w-[370px] h-[300px] mx-auto mt-4 rounded-lg group overflow-hidden">
          <Image
            className="p-8 object-cover group-hover:scale-110 transition duration-500 ease-in-out group-hover:rotate-3 object-cover h-full w-full"
            src={product.image || "/placeholder.png"} // Placeholder jika gambar tidak tersedia
            width={250}
            height={250}
            alt={product.title || "Product image"}
          />
        </div>

        <div className="px-5 pb-5">
          <h3 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white ml-[20px]">
            {product.name || "Unknown Product"}
          </h3>

          <div className="flex items-center ml-[10px] mt-2.5 mb-2">
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
              Rate: {product.rating?.rate || "No Rating"}
            </span>
          </div>

          <div className="flex flex-col items-start ml-[20px]">
            <p className="text-base text-gray-900 dark:text-white mb-4">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet sequi totam minus. Aspernatur nihil sint nobis quod perferendis itaque culpa?
            </p>
            <div className="flex items-center justify-between w-full">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {product.price
                  ? product.price.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })
                  : "Price Unavailable"}
              </p>
              <a
                href="#"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Buy
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProductPage;
