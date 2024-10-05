import { AI_MODEL } from "../constants/Model";
import { ArgumentTypes, RestoreModelInputType } from "@/types/common";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.AI_TOKEN,
});

type RunConfigType = ArgumentTypes<typeof replicate.run>[1];

export const runAi = async (
  config: RunConfigType & { input: RestoreModelInputType },
  model?: typeof AI_MODEL | undefined
) => {
  const output = await replicate.run(model ?? AI_MODEL, config);
  return output;
};
