//@ts-check
import { eslintConfig } from "js-style-kit";

export default eslintConfig({
  react: {
    framework: "next",
  },
  rules: {
    "@typescript-eslint/prefer-nullish-coalescing": [
      "warn",
      {
        ignorePrimitives: {
          number: true,
          string: true,
        },
      },
    ],
  },
  typescript: "tsconfig.eslint.json",
});
