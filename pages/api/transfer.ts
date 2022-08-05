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
  try {
    const output = await openapiTS(JSON.parse(swaggerJsonStr));
    res.status(200).json({ code: 200, data: output } as any);
  } catch (error: any) {
    console.log(error.toString(), "error");
    console.log(
      JSON.stringify(error, ["message", "arguments", "type", "name"]),
      "errr"
    );
    res.status(500).json({
      code: 500,
      msg: error.toString(),
    } as any);
  }
}
