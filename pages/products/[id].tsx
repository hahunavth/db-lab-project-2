import React, { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ApiProductT } from "../../types/api";
import Navbar from "../../components/Layout/Navbar";
import Footer from "../../components/Layout/Footer";
import ProductTest from "../../components/ProductTest";

interface Props {}

export default function ProductDetail({}: Props): ReactElement {
  const [productDetail, setProductDetail] = useState<ApiProductT>();

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    (async () => {
      const result = await fetch(`/api/products/byId/${id}`).then((res) =>
        res.json()
      );
      if (result.data) setProductDetail(result.data);
    })();
  }, [id]);
  console.log(productDetail);

  return (
    <>
      <Navbar />
      {/*  */}
      <ProductTest data={productDetail} isLoading={!productDetail} />
      {/*  */}
      <Footer />
    </>
  );
}
