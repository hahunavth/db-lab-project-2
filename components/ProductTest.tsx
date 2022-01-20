import { useContext, useState } from "react";
import { StarIcon } from "@heroicons/react/solid";
import { RadioGroup } from "@headlessui/react";
import { ApiProductT } from "../types/api";
import Image from "next/image";
import { CartContext } from "../pages/_app";

// const product = {
//   name: "Basic Tee 6-Pack",
//   price: "$192",
//   href: "#",
//   breadcrumbs: [
//     { id: 1, name: "Men", href: "#" },
//     { id: 2, name: "Clothing", href: "#" },
//   ],
//   images: [
//     {
//       src: "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
//       alt: "Two each of gray, white, and black shirts laying flat.",
//     },
//     {
//       src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
//       alt: "Model wearing plain black basic tee.",
//     },
//     {
//       src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
//       alt: "Model wearing plain gray basic tee.",
//     },
//     {
//       src: "https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg",
//       alt: "Model wearing plain white basic tee.",
//     },
//   ],
//   colors: [
//     { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
//     { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
//     { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
//   ],
//   sizes: [
//     { name: "XXS", inStock: false },
//     { name: "XS", inStock: true },
//     { name: "S", inStock: true },
//     { name: "M", inStock: true },
//     { name: "L", inStock: true },
//     { name: "XL", inStock: true },
//     { name: "2XL", inStock: true },
//     { name: "3XL", inStock: true },
//   ],
//   description:
//     'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
//   highlights: [
//     "Hand cut and sewn locally",
//     "Dyed with our proprietary colors",
//     "Pre-washed & pre-shrunk",
//     "Ultra-soft 100% cotton",
//   ],
//   details:
//     'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
// };
// const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

interface ProductTestProps {
  data?: ApiProductT;
  isLoading?: boolean;
}

export default function ProductTest({ data, isLoading }: ProductTestProps) {
  const [orderNum, setOrderNum] = useState("1");

  const { cart, setCart } = useContext(CartContext);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCart &&
      data &&
      setCart((cart) => {
        let exists = false;
        const sp = cart.map((item) => {
          if (item.idLoaiDongHo === data.idLoaiDongHo) {
            exists = true;
            return {
              idLoaiDongHo: data.idLoaiDongHo,
              ten: data.ten,
              urlAnh: data.urlAnh,
              num: Number.parseInt(orderNum),
              giaTien: data.giaTien,
            };
          }
          return item;
        });

        if (exists) return sp;

        return [
          ...cart,
          {
            idLoaiDongHo: data.idLoaiDongHo,
            ten: data.ten,
            urlAnh: data.urlAnh,
            num: Number.parseInt(orderNum),
            giaTien: data.giaTien,
          },
        ];
      });
    console.log(cart);
  };

  return (
    <div className="bg-white">
      <div className="pt-6">
        {/* Image gallery */}
        <div className="mt-6 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8"></div>

        {/* Product info */}
        <div className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
              {data?.ten}
            </h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:mt-0 lg:row-span-3">
            {data?.urlAnh ? (
              <Image src={data?.urlAnh} width={1000} height={1000} />
            ) : null}
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl text-gray-900">
              {data?.giaTien && data?.giaTien * 1000} d
            </p>

            {/* Reviews */}

            <form className="mt-10" onSubmit={handleSubmit}>
              <div>
                <h3 className="text-sm text-gray-900 font-medium">Color</h3>

                <div className="mt-4">
                  <label className="sr-only">Nhap so luong</label>
                  <input
                    className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                    value={orderNum}
                    onChange={(e) => setOrderNum(e.target.value)}
                  />
                  <div className="flex items-center space-x-3"></div>
                </div>
              </div>

              <button
                type="submit"
                className="mt-10 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add to bag
              </button>
            </form>
          </div>

          <div className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h2>Mo Ta</h2>
            <p>{data?.moTa}</p>
          </div>

          <div className="mt-10">
            <h2 className="text-sm font-medium text-gray-900">Chi tiet</h2>

            <div className="mt-4 space-y-6">
              <p className="text-sm text-gray-600">
                Duong kinh mat: <span>{data?.duongKinhMat}</span>
              </p>
              <p className="text-sm text-gray-600">
                Gioi tinh: <span>{data?.gioiTinh}</span>
              </p>
              <p className="text-sm text-gray-600">
                Nang luong su dung: <span>{data?.nangLuongSuDung}</span>
              </p>
              <p className="text-sm text-gray-600">
                Chat lieu day: <span>{data?.chatLieuDay}</span>
              </p>
              <p className="text-sm text-gray-600">
                Chat lieu vo: <span>{data?.chatLieuVo}</span>
              </p>
              <p className="text-sm text-gray-600">
                Chat lieu mat: <span>{data?.chatLieuMat}</span>
              </p>
              <p className="text-sm text-gray-600">
                Bao hanh: <span>{data?.cheDoBaoHanh}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
