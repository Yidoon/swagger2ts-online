// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import openapiTS from "openapi-typescript";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { swaggerJsonStr } = req.body;
  const output = await openapiTS(JSON.parse(swaggerJsonStr));
  res.status(200).json({ data: output } as any);
}
