import { Environment, getEnvironment } from "@/scripts/Utils/Environment";
import { execSync } from "node:child_process";
import fetchExtensionsFromCMS from "@/scripts/FetchListsFromCMS/FetchExtensions";
import fetchToolsFromCMS from "@/scripts/FetchListsFromCMS/FetchTools";

export interface AppProps {
  environment: Environment;
  buildHash: string;
  buildBranch: string;
  buildTime: string;
  extensionsListed: number;
  toolsListed: number;
}

export async function getAppProps(): Promise<AppProps> {
  return {
    environment: getEnvironment(),
    buildHash:
      process.env.VERCEL_GIT_COMMIT_SHA != undefined
        ? process.env.VERCEL_GIT_COMMIT_SHA
        : execSync("git rev-parse HEAD").toString().trim(),
    buildBranch:
      process.env.VERCEL_GIT_COMMIT_REF != undefined
        ? process.env.VERCEL_GIT_COMMIT_REF
        : execSync("git rev-parse --abbrev-ref HEAD").toString().trim(),
    buildTime: new Date().toISOString(),
    extensionsListed: (await fetchExtensionsFromCMS()).length,
    toolsListed: (await fetchToolsFromCMS()).length,
  };
}

export default getAppProps;
