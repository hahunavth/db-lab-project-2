// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ApiProductT, ApiResponseT } from "../../../types/api";
import { conn } from "../../../utils/database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponseT<ApiProductT[]>>
) {
  const response = await conn?.query('select * from "loaiDongHo"');
  res.status(200).json({
    success: true,
    _length: response?.rowCount,
    data: response?.rows as ApiProductT[],
  });
}
