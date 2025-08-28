import { createJiti } from "jiti";
import { fileURLToPath } from "node:url";

const jiti = createJiti(fileURLToPath(import.meta.url));

jiti("./src/env");

// eslint-disable-next-line jsdoc/check-tag-names
/** @type {import('next').NextConfig} */
export default {
  experimental: {
    reactCompiler: true,
  },
  typedRoutes: true,
};
