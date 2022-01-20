import "../styles/globals.css";
import type { AppProps } from "next/app";
import React, { useState } from "react";

import "../styles/tailwind.css";

export const CartContext = React.createContext<{
  cart?: CartT[];
  setCart?: React.Dispatch<React.SetStateAction<CartT[]>>;
}>({});
export interface CartT {
  idLoaiDongHo: number;
  ten: string;
  urlAnh: string;
  num: number;
  giaTien: number;
}

function MyApp({ Component, pageProps }: AppProps) {
  const [cart, setCart] = useState<CartT[]>([]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      <Component {...pageProps} />
    </CartContext.Provider>
  );
}

export default MyApp;
