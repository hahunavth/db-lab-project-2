import React, { ReactElement, useContext, useState } from "react";
import Footer from "../components/Layout/Footer";
import Navbar from "../components/Layout/Navbar";
import { CartContext, CartT } from "./_app";
import Image from "next/image";
import classNames from "classnames";
import { useFormik } from "formik";
import { ApiUserT } from "../types/api";
import useDebounce from "../hooks/useDebounce";

interface Props {}

export interface PaymentUserT {
  ten: string;
  email: string;
  diaChi: string;
  sdt: string;
  gioiTinh: string;
}

export default function Payment({}: Props): ReactElement {
  const [user, setUser] = useState<ApiUserT>();
  const { cart, setCart } = useContext(CartContext);

  const formik = useFormik<PaymentUserT>({
    initialValues: {
      ten: "",
      email: "",
      diaChi: "",
      gioiTinh: "",
      sdt: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const onSubmit = () => {
    console.log(formik?.values);
  };

  const onSDTChange = (text: string) => {
    formik.setFieldValue("sdt", text);
    (async () => {
      const result = await fetch(`api/users/sdt/${text}`).then((res) =>
        res.json()
      );
      if (result.success) {
        formik.setFieldValue("ten", result?.data?.ten);
        formik.setFieldValue("email", result?.data?.email);
        formik.setFieldValue("diaChi", result?.data?.diaChi);
        formik.setFieldValue("gioiTinh", result?.data?.gioiTinh);
      } else {
        formik.setFieldValue("ten", "");
        formik.setFieldValue("email", "");
        formik.setFieldValue("diaChi", "");
        formik.setFieldValue("gioiTinh", "");
      }
    })();
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center my-6">
        <div className="flex flex-col w-full p-8 text-gray-800 bg-white shadow-lg pin-r pin-y md:w-4/5 lg:w-4/5">
          <div className="flex-1">
            <table className="w-full text-sm lg:text-base" cellSpacing={0}>
              <thead>
                <tr className="h-12 uppercase">
                  <th className="hidden md:table-cell" />
                  <th className="text-left">Product</th>
                  <th className="lg:text-right text-left pl-5 lg:pl-0">
                    <span className="lg:hidden" title="Quantity">
                      Qtd
                    </span>
                    <span className="hidden lg:inline">Quantity</span>
                  </th>
                  <th className="hidden text-right md:table-cell">
                    Unit price
                  </th>
                  <th className="text-right">Total price</th>
                </tr>
              </thead>

              {/* Table body */}

              <tbody>
                {cart?.map((item) => (
                  <TableRow
                    key={item.idLoaiDongHo}
                    cartItem={item}
                    setCart={setCart as any}
                  />
                ))}
              </tbody>
            </table>
            <hr className="pb-6 mt-6" />
            <div className="my-4 mt-6 -mx-2 lg:flex">
              <div className="lg:px-2 lg:w-1/2">
                <div className="p-4 bg-gray-100 rounded-full">
                  <h1 className="ml-2 font-bold uppercase">Nhap thong tin</h1>
                </div>
                <form onSubmit={formik.handleSubmit} className="p-4">
                  <p className="mb-4 italic"></p>
                  <div className="justify-center md:flex"></div>
                  {/*  */}
                  <label
                    htmlFor="sdt"
                    className="text-xs text-primary font-light placeholder-gray-gray4 px-2 pt-1.5"
                  >
                    So dien thoai
                  </label>
                  <input
                    id="sdt"
                    name="sdt"
                    type="sdt"
                    onChange={(e) => onSDTChange(e.target.value)}
                    value={formik.values.sdt}
                    className="w-full px-2 pb-1.5 text-primary outline-none text-base font-light rounded-md border-b-2"
                  />
                  <label
                    htmlFor="ten"
                    className="text-xs text-primary font-light placeholder-gray-gray4 px-2 pt-1.5"
                  >
                    Ten
                  </label>
                  <input
                    id="ten"
                    name="ten"
                    type="ten"
                    onChange={formik.handleChange}
                    value={formik.values.ten}
                    className="w-full px-2 pb-1.5 text-primary outline-none text-base font-light rounded-md border-b-2"
                  />
                  <label
                    htmlFor="email"
                    className="text-xs text-primary font-light placeholder-gray-gray4 px-2 pt-1.5"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    className="w-full px-2 pb-1.5 text-primary outline-none text-base font-light rounded-md border-b-2"
                  />
                  <label
                    htmlFor="diaChi"
                    className="text-xs text-primary font-light placeholder-gray-gray4 px-2 pt-1.5"
                  >
                    Dia chi
                  </label>
                  <input
                    id="diaChi"
                    name="diaChi"
                    type="diaChi"
                    onChange={formik.handleChange}
                    value={formik.values.diaChi}
                    className="w-full px-2 pb-1.5 text-primary outline-none text-base font-light rounded-md border-b-2"
                  />

                  {/*  */}
                </form>
              </div>
              <div className="lg:px-2 lg:w-1/2">
                <div className="p-4 bg-gray-100 rounded-full">
                  <h1 className="ml-2 font-bold uppercase">Order Details</h1>
                </div>
                <div className="p-4">
                  <p className="mb-6 italic">
                    Shipping and additionnal costs are calculated based on
                    values you have entered
                  </p>
                  <div className="flex justify-between border-b">
                    <div className="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                      Subtotal
                    </div>
                    <div className="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                      {cart?.reduce(
                        (total, val) => total + val.giaTien * val.num,
                        0
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between pt-4 border-b">
                    <div className="flex lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-gray-800">
                      <form method="POST">
                        <button type="submit" className="mr-2 mt-1 lg:mt-2">
                          <svg
                            aria-hidden="true"
                            data-prefix="far"
                            data-icon="trash-alt"
                            className="w-4 text-red-600 hover:text-red-800"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            <path
                              fill="currentColor"
                              d="M268 416h24a12 12 0 0012-12V188a12 12 0 00-12-12h-24a12 12 0 00-12 12v216a12 12 0 0012 12zM432 80h-82.41l-34-56.7A48 48 0 00274.41 0H173.59a48 48 0 00-41.16 23.3L98.41 80H16A16 16 0 000 96v16a16 16 0 0016 16h16v336a48 48 0 0048 48h288a48 48 0 0048-48V128h16a16 16 0 0016-16V96a16 16 0 00-16-16zM171.84 50.91A6 6 0 01177 48h94a6 6 0 015.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0012-12V188a12 12 0 00-12-12h-24a12 12 0 00-12 12v216a12 12 0 0012 12z"
                            />
                          </svg>
                        </button>
                      </form>
                      Coupon 90off
                    </div>
                    <div className="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-green-700">
                      0
                    </div>
                  </div>
                  <div className="flex justify-between pt-4 border-b">
                    <div className="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                      New Subtotal
                    </div>
                    <div className="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                      {cart?.reduce(
                        (total, val) => total + val.giaTien * val.num,
                        0
                      )}
                    </div>
                  </div>
                  {/* <div className="flex justify-between pt-4 border-b">
                    <div className="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                      Tax
                    </div>
                    <div className="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                      2,976.55€
                    </div>
                  </div> */}
                  <div className="flex justify-between pt-4 border-b">
                    <div className="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                      Total
                    </div>
                    <div className="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                      {cart?.reduce(
                        (total, val) => total + val.giaTien * val.num,
                        0
                      )}
                    </div>
                  </div>
                  <a href="#">
                    <button
                      className={classNames(
                        "flex justify-center w-full px-10 py-3 mt-6 font-medium text-white uppercase bg-gray-800 rounded-full shadow item-center hover:bg-gray-700 focus:shadow-outline focus:outline-none",
                        { "bg-gray-700": !cart?.length }
                      )}
                      onClick={onSubmit}
                    >
                      <svg
                        aria-hidden="true"
                        data-prefix="far"
                        data-icon="credit-card"
                        className="w-8"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                      >
                        <path
                          fill="currentColor"
                          d="M527.9 32H48.1C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48.1 48h479.8c26.6 0 48.1-21.5 48.1-48V80c0-26.5-21.5-48-48.1-48zM54.1 80h467.8c3.3 0 6 2.7 6 6v42H48.1V86c0-3.3 2.7-6 6-6zm467.8 352H54.1c-3.3 0-6-2.7-6-6V256h479.8v170c0 3.3-2.7 6-6 6zM192 332v40c0 6.6-5.4 12-12 12h-72c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h72c6.6 0 12 5.4 12 12zm192 0v40c0 6.6-5.4 12-12 12H236c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h136c6.6 0 12 5.4 12 12z"
                        />
                      </svg>
                      <span className={classNames("ml-2 mt-5px")}>
                        Procceed to checkout
                      </span>
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

function TableRow({
  cartItem,
  setCart,
}: {
  cartItem: CartT;
  setCart: React.Dispatch<React.SetStateAction<CartT[]>>;
}) {
  return (
    <tr>
      <td className="hidden pb-4 md:table-cell">
        <a href="#">
          <Image
            src={cartItem.urlAnh}
            className="w-20 rounded"
            alt={cartItem.ten}
            width={80}
            height={80}
          />
        </a>
      </td>
      <td>
        <a href="#">
          <p className="mb-2 md:ml-4">{cartItem.ten}</p>
          <button
            type="submit"
            className="text-gray-700 md:ml-4"
            onClick={() =>
              setCart((cart) =>
                cart.filter(
                  (item) => item.idLoaiDongHo !== cartItem.idLoaiDongHo
                )
              )
            }
          >
            <small>(Remove item)</small>
          </button>
        </a>
      </td>
      <td className="justify-center md:justify-end md:flex mt-6">
        <div className="w-20 h-10">
          <div className="relative flex flex-row w-full h-8">
            <input
              type="number"
              value={cartItem.num}
              onChange={(e) =>
                setCart((cart) =>
                  cart.map((item) => {
                    if (cartItem.idLoaiDongHo === item.idLoaiDongHo) {
                      return {
                        ...item,
                        num: Number.parseInt(e.target.value),
                      };
                    }
                    return item;
                  })
                )
              }
              className="w-full font-semibold text-center text-gray-700 bg-gray-200 outline-none focus:outline-none hover:text-black focus:text-black"
            />
          </div>
        </div>
      </td>
      <td className="hidden text-right md:table-cell">
        <span className="text-sm lg:text-base font-medium">
          {cartItem.giaTien}
        </span>
      </td>
      <td className="text-right">
        <span className="text-sm lg:text-base font-medium">
          {cartItem.giaTien * cartItem.num}
        </span>
      </td>
    </tr>
  );
}
