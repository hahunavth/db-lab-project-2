// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ApiProductT, ApiResponseT, ApiUserT } from "../../../types/api";
import { conn } from "../../../utils/database";
import { CartT } from "../../_app";

type ThanhToanT = {
  dvVanChuyen: string;
  diaChiNhan: string;
  nguoiDung: ApiUserT;
  cart: CartT[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body: ThanhToanT = req.body;
  console.log(body.nguoiDung);
  const response = await conn?.query(
    'insert into "donHang" ("idNguoiDung", "diaChiNhan", "dvVanChuyen") values ($1, $2, $3) returning "idDonHang"',
    [body.nguoiDung?.idNguoiDung, body.diaChiNhan, body.dvVanChuyen]
  );
  body.cart.forEach((item) =>
    conn?.query(
      'insert into "order_items" ("idDonHang","idLoaiDongHo" , "soLuong", ) values ($1, $2, $3)',

      [response?.rows[0], item.idLoaiDongHo, item.num]
    )
  );
  res.status(200).json({
    success: true,
    _length: response?.rowCount,
    data: response?.rows as ApiProductT[],
  });
}
