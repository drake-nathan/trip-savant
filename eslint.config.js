//@ts-check
import { eslintConfig } from "js-style-kit";

export default eslintConfig({
  ignores: ["next-env.d.ts", "convex/_generated/"],
  react: {
    framework: "next",
  },
  typescript: "tsconfig.eslint.json",
});
