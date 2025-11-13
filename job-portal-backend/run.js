import { register } from "ts-node";
import { pathToFileURL } from "node:url";

register({
  esm: true,
  compilerOptions: { module: "ESNext" },
});

import(pathToFileURL("./src/utils/testEmail.ts").href);
