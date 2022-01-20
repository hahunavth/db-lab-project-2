// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ApiProductT, ApiResponseT } from "../../../types/api";
import { conn } from "../../../utils/database";

export type ApiReportT = {
  ngDung: number;
  donHang: number;
  nhapHang: number;
  hetHang: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponseT<ApiReportT>>
) {
  const nd = await conn?.query(
    `select count(*) from "nguoiDung" where "nguoiDung"."ngayTao" > (current_date - interval '1 month');`
  );

  const dh = await conn?.query(
    `select count(*) from "donHang" where "donHang"."thoiGian" > (current_date - interval '1 month');`
  );

  const nh = await conn?.query(
    `select sum("soLuong") from "lichSuNhapHang" where "lichSuNhapHang"."ngayNhap" > (current_date - interval '1 month');`
  );

  const hh = await conn?.query(
    `select count(*) from "loaiDongHo" where "trangThai" = 'het_hang';`
  );

  res.status(200).json({
    success: true,
    data: {
      ngDung: nd?.rows[0]?.count,
      donHang: dh?.rows[0]?.count,
      nhapHang: nh?.rows[0]?.sum,
      hetHang: hh?.rows[0]?.count,
    },
  });
}
