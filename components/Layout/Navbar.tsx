import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactElement, useContext, useEffect, useState } from "react";
import { CartContext } from "../../pages/_app";
import Image from "next/image";
import { ApiProductT } from "../../types/api";
import useDebounce from "../../hooks/useDebounce";

interface Props {}

export default function Navbar({}: Props): ReactElement {
  const router = useRouter();
  const [showCart, setShowCart] = useState(false);
  const { cart, setCart } = useContext(CartContext);

  return (
    <div>
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            {/* <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start"> */}
            <Link href={"/"} passHref>
              <div className="flex-shrink-0 flex items-center">
                <Image
                  className="block  h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                  alt="Workflow"
                  width={48}
                  height={48}
                />
              </div>
            </Link>
            {/* </div> */}
            <SearchBar />

            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {/* <button
                type="button"
                className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                onClick={() => {}}
              >
                <span className="sr-only">View notifications</span>
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button> */}

              <div className="ml-3 relative">
                <div>
                  <button
                    type="button"
                    className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                    onClick={() => setShowCart(!showCart)}
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src="data:image/png;base64,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"
                      alt=""
                    />
                  </button>
                  {cart?.length ? (
                    <div className="absolute -top-2 -right-2 text-white bg-cyan-600 text-sm rounded-lg px-1">
                      {cart.length}
                    </div>
                  ) : null}
                </div>
                {/* menu */}
                {showCart ? (
                  <div
                    className="w-96 origin-top-right absolute right-0 mt-2 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                  >
                    {cart?.map((item) => (
                      <div
                        key={item.idLoaiDongHo}
                        className="w-full m-2 flex flex-row justify-between place-content-around"
                      >
                        <div className="flex align-super">
                          <Image
                            className="rounded-md shadow-md mr-2"
                            src={item.urlAnh}
                            width={50}
                            height={50}
                            alt={item.ten}
                          />
                          <span className="my-auto">{item.ten}</span>
                          <span className="rounded-sm bg-blue-900 my-auto text-white min-w-6 h-6 text-center ml-5">
                            {item.num}
                          </span>
                        </div>
                        <button
                          className="px-2 m-auto py-1 bg-cyan-700 hover:bg-cyan-500 text-white rounded-lg"
                          onClick={() =>
                            setCart &&
                            setCart((cart) =>
                              cart.filter(
                                (i) => i.idLoaiDongHo !== item.idLoaiDongHo
                              )
                            )
                          }
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <div className="flex ">
                      <span className="p-3">Tong so: {cart?.length}</span>
                      <div
                        className="p-1 my-auto text-white bg-red-700 float-right block rounded-md"
                        onClick={() => router.push("/payment")}
                      >
                        Thanh toan
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <div className="sm:hidden" id="mobile-menu">
          {/* <div className="px-2 pt-2 pb-3 space-y-1">
            <a
              href="#"
              className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
              aria-current="page"
            >
              Dashboard
            </a>

            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Team
            </a>

            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Projects
            </a>

            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Calendar
            </a>
          </div> */}
        </div>
      </nav>
    </div>
  );
}

function SearchBar() {
  const [value, setValue] = useState("");
  const [results, setResults] = useState<ApiProductT[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const debouncedSearchTerm = useDebounce<string>(value, 500);

  useEffect(
    () => {
      if (debouncedSearchTerm) {
        setIsSearching(true);
        fetch(`/api/products/byName/${value}`)
          .then((res) => res.json())
          .then((results) => {
            setIsSearching(false);
            setResults(results.data);
            console.log(results);
          });
      } else {
        setResults([]);
        setIsSearching(false);
      }
    },
    [debouncedSearchTerm, value] // Only call effect if debounced search term changes
  );

  return (
    <div className="mr-16">
      <div className="container flex justify-center items-center relative">
        <div className="relative">
          {/* <div className="absolute top-4 left-3">
            <i className="fa fa-search text-gray-400 z-20 hover:text-gray-500" />{" "}
          </div> */}
          <input
            type="text"
            className="h-12 w-96 pl-10 pr-20 rounded-lg z-0 focus:shadow focus:outline-none"
            placeholder="Search"
            onChange={(e) => setValue(e.target.value)}
          />
          <div className="absolute top-2 right-2">
            <button className="h-8 w-20 text-white rounded-lg bg-cyan-500 hover:bg-cyan-600">
              Search
            </button>
          </div>
          <div className="w-96 origin-top-right absolute right-0 mt-2 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
            {!isSearching ? (
              results &&
              results?.map((item) => (
                <div key={item.idLoaiDongHo}>
                  <Link href={`/products/${item.idLoaiDongHo}`} passHref>
                    <div className="flex align-super p-1">
                      <Image
                        src={item.urlAnh}
                        width={50}
                        height={50}
                        alt={item.ten}
                        className="rounded-md"
                      />
                      <span className="my-auto ml-3">{item.ten}</span>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <span className="p-5">Loading</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
