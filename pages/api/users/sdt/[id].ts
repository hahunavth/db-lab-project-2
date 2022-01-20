// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { QueryConfig, QueryResultRow } from "pg";
import { ApiProductT, ApiResponseT, ApiUserT } from "../../../../types/api";
import { conn } from "../../../../utils/database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponseT<ApiUserT[]>>
) {
  const { id } = req.query;

  const query: QueryConfig = {
    name: "fetch-user-by-sdt",
    text: `select * from "nguoiDung" where "sdt" = $1;`,
    values: [id],
  };

  const response = await conn?.query(query);
  res.status(200).json({
    success: !!response?.rowCount,
    data: response?.rows[0] as ApiUserT[],
  });
}
