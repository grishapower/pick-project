/** @type {import('prettier').Config} */
module.exports = {
  arrowParens: "always",
  printWidth: 80,
  singleQuote: false,
  jsxSingleQuote: false,
  semi: true,
  trailingComma: "all",
  bracketSpacing: true,

  tabWidth: 2,
  plugins: [
    require.resolve("prettier-plugin-organize-imports"),
    require.resolve("prettier-plugin-tailwindcss"),
  ],
  // tailwindConfig: "./packages/config/tailwind",
  importOrder: [
    "^(next/(.*)$)|^(next$)",
    "<THIRD_PARTY_MODULES>",
    "^@pickem/(.*)$",
    "",
    "^~/utils/(.*)$",
    "^~/components/(.*)$",
    "^~/styles/(.*)$",
    "^~/(.*)$",
    "^[./]",
  ],
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
  importOrderBuiltinModulesToTop: true,
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderMergeDuplicateImports: true,
  importOrderCombineTypeAndValueImports: true,
};
