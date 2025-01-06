import ModalLayout from "@/components/Modal";
import { getData } from "@/services/product/getData";
import Image from "next/image";

const Modal = async (props: any) => {
  try {
    const { params } = props;

    if (!params || !params.id) {
      throw new Error("Product ID is missing.");
    }

    const apiUrl = process.env.NEXT_PUBLIC_API || "http://localhost:3000";
    const product = await getData(`${apiUrl}/api/product?id=${params.id}`);

    if (!product || !product.data) {
      throw new Error("Product data not found.");
    }

    const { data } = product;

    return (
      <ModalLayout>
        <div className="h-[300px] w-[300px] overflow-hidden group mx-auto mt-4 rounded-lg">
          <Image
            className="object-cover group-hover:scale-110 transition duration-500 ease-in-out object-cover h-full w-full"
            src={data.image || "/placeholder-image.png"} // Fallback untuk gambar
            width={300}
            height={300}
            alt={data.title || "Product image"}
          />
        </div>

        <div className="px-5 pb-5">

          <div className="flex items-center ml-4 mt-2.5 mb-2">
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
              rate: {data.rating?.rate || "No Rating"}
            </span>
          </div>

          <div className="flex flex-col items-start ml-[30px]">
            <p className="text-base text-gray-900 dark:text-white mb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
              dignissimos odio aliquid.
            </p>
            <div className="flex items-center justify-between w-full">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {data.price
                  ? data.price.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })
                  : "Price Unavailable"}
              </p>
              <a
                href="https://www.nike.com/id/w/mens-shoes-nik1zy7ok"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Buy
              </a>
            </div>
          </div>
        </div>
      </ModalLayout>
    );
  } catch (error) {
    console.error("Error loading product modal:", error);
    return (
      <ModalLayout>
        <div className="w-full flex justify-center items-center mt-8">
          <p className="text-red-500 text-lg">
            Failed to load product details. Please try again later.
          </p>
        </div>
      </ModalLayout>
    );
  }
};

export default Modal;
