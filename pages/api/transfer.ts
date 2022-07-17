// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const { default: dtsgenerator, parseSchema } = require("dtsgenerator");
import fs from "fs";
import openapiTS from "openapi-typescript";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { swaggerJsonStr } = req.body;
  const jsonObj = {
    swagger: "2.0",
    info: {
      description: "ad-center RESTful APIs",
      title: "ad-center接口文档",
      version: "1.0",
    },
    host: "source-dev.tenclass.net.cn",
    basePath: "https://source-dev.tenclass.net.cn",
    schemes: [],
    consumes: ["*/*"],
    produces: ["*/*"],
    paths: {
      "/b/api/v1/source/agent": {
        get: {
          summary: "代理商列表",
          deprecated: false,
          produces: ["*/*"],
          operationId: "listPageUsingGET",
          responses: {
            "200": {
              schema: {
                originalRef: "通用分页查询返回参数«AdAccountAgentDTO»",
                $ref: "#/definitions/通用分页查询返回参数«AdAccountAgentDTO»",
              },
              description: "OK",
            },
            "401": {
              description: "Unauthorized",
            },
            "403": {
              description: "Forbidden",
            },
            "404": {
              description: "Not Found",
            },
          },
          parameters: [
            {
              in: "query",
              name: "admin_user_id",
              format: "int64",
              description: "admin_user_id",
              type: "integer",
              required: false,
            },
            {
              in: "query",
              name: "agent_name",
              description: "agent_name",
              type: "string",
              required: false,
            },
            {
              in: "header",
              name: "authorization",
              description: "用户token",
              type: "string",
              required: false,
            },
            {
              in: "query",
              name: "channel",
              description: "channel",
              type: "string",
              required: false,
            },
            {
              in: "query",
              name: "department_id",
              format: "int64",
              description: "department_id",
              type: "integer",
              required: false,
            },
            {
              default: 10,
              in: "query",
              name: "limit",
              format: "int32",
              description: "limit",
              type: "integer",
              required: false,
            },
            {
              in: "query",
              name: "name",
              description: "name",
              type: "string",
              required: false,
            },
            {
              default: 0,
              in: "query",
              name: "offset",
              format: "int32",
              description: "offset",
              type: "integer",
              required: false,
            },
            {
              in: "query",
              name: "username",
              description: "username",
              type: "string",
              required: false,
            },
            {
              in: "header",
              name: "x-shop-code",
              description: "店铺code",
              type: "string",
              required: false,
            },
          ],
          "x-order": "2147483647",
          tags: ["B端 - 账户管理- 投放账户管理"],
        },
      },
    },
    definitions: {
      "通用分页查询返回参数«AdAccountAgentDTO»": {
        type: "object",
        title: "通用分页查询返回参数«AdAccountAgentDTO»",
        properties: {
          total: {
            format: "int32",
            type: "integer",
          },
          data: {
            type: "array",
            items: {
              originalRef: "AdAccountAgentDTO",
              $ref: "#/definitions/AdAccountAgentDTO",
            },
          },
        },
      },
      AdAccountAgentDTO: {
        description: "广告账户详情",
        type: "object",
        title: "AdAccountAgentDTO",
        properties: {
          account_type: {
            description: "账户类型",
            type: "string",
            refType: null,
          },
          admin_user_id: {
            format: "int64",
            description: "投放优化师ID,用户ID,组织架构中成员ID",
            type: "integer",
            refType: null,
          },
          agent_name: {
            description: "代理商名称",
            type: "string",
            refType: null,
          },
          department_id: {
            format: "int64",
            description: "部门id",
            type: "integer",
            refType: null,
          },
          department_name: {
            description: "部门名称",
            type: "string",
            refType: null,
          },
          channel: {
            description: "渠道",
            type: "string",
            refType: null,
          },
          created_at: {
            format: "date-time",
            description: "创建日期",
            type: "string",
            refType: null,
          },
          opt_name: {
            description: "投放优化师",
            type: "string",
            refType: null,
          },
          agent_type: {
            description: "代理商类型",
            type: "string",
            refType: null,
          },
          enable_status: {
            format: "int32",
            description: "是否启用 (数据需要)",
            type: "integer",
            refType: null,
          },
          shop_id: {
            format: "int64",
            description: "店铺ID",
            type: "integer",
            refType: null,
          },
          app_key: {
            description: "开发者平台应用授权相关 key(client_id/app_id/token)",
            type: "string",
            refType: null,
          },
          creator_id: {
            format: "int64",
            description: "创建人ID",
            type: "integer",
            refType: null,
          },
          name: {
            description: "账号昵称",
            type: "string",
            refType: null,
          },
          creator_name: {
            description: "创建人姓名",
            type: "string",
            refType: null,
          },
          id: {
            format: "int64",
            description: "ID",
            type: "integer",
            refType: null,
          },
          app_secret: {
            description:
              "开发者平台应用授权相关secret(client_secret/app_secret)",
            type: "string",
            refType: null,
          },
          remarks: {
            description: "备注",
            type: "string",
            refType: null,
          },
          username: {
            description: "账户ID 投放平台登录名(account_id)",
            type: "string",
            refType: null,
          },
        },
      },
    },
  };
  const output = await openapiTS(jsonObj);
  res.status(200).json({ data: output });
}