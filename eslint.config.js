// @ts-check
import { flatConfigs as eslintPluginImportX } from "eslint-plugin-import-x";
import { eslintConfig } from "js-style-kit";

export default eslintConfig(
  {
    react: {
      framework: "next",
    },
    typescript: "tsconfig.eslint.json",
  },
  // @ts-expect-error - eslint types are weird
  eslintPluginImportX.recommended,
  eslintPluginImportX.typescript,
);
