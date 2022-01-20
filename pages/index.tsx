import type { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Footer from "../components/Layout/Footer";
import Navbar from "../components/Layout/Navbar";
import ProductList from "../components/ProductList";
import styles from "../styles/Home.module.css";
import { ApiProductT } from "../types/api";

const Home: NextPage = () => {
  const [productList, setProductList] = useState<ApiProductT[]>([]);

  useEffect(() => {
    (async () => {
      const result = await fetch("/api/products").then((res) => res.json());
      if (result?.data) {
        setProductList(
          result?.data.filter((watch: ApiProductT) => watch.urlAnh) || []
        );
      }
      console.log(result);
    })();
  }, []);
  // console.log(productList);

  return (
    <>
      <Navbar />
      <ProductList list={productList} />
      <Footer />
    </>
  );
};

export default Home;
