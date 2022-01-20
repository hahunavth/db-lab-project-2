// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { QueryConfig, QueryResultRow } from "pg";
import { ApiProductT, ApiResponseT } from "../../../../types/api";
import { conn } from "../../../../utils/database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponseT<ApiProductT>>
) {
  const { id } = req.query;

  const query: QueryConfig = {
    name: "fetch-product-by-id",
    text: 'select * from "loaiDongHo" where "idLoaiDongHo" = $1;',
    values: [id],
  };

  const response = await conn?.query(query);
  res.status(200).json({
    success: true,
    data: response?.rows[0] as ApiProductT,
  });
}
