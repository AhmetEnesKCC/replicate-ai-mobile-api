import express, { Request } from "express";

import dotenv from "dotenv";
dotenv.config();

import { RestoreModelInputType } from "./types/common";

import { runAi } from "./utils/run-ai";

import cors from "cors";

import bodyParser from "body-parser";

const app = express();

app.use(cors());

app.use(bodyParser.json());

interface CustomRequest<T> extends Request {
  body: T;
}

app.post<RestoreModelInputType>(
  "/run-ai",
  // @ts-ignore
  async (req: CustomRequest<RestoreModelInputType>, res) => {
    const options = req.body as RestoreModelInputType;
    if (!options.image) {
      delete options.image;
    }
    try {
      console.log(options);
      const data = await runAi({ input: options }, req.body.model);
      res.send(data);
    } catch (error: any) {
      res.send({ error: error }).status(500);
    }
  }
);

app.listen(3000);
