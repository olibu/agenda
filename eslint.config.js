import globals from "globals";
import pluginJs from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import stylistic from '@stylistic/eslint-plugin'

export default [
  { files: ["**/*.{js,mjs,cjs,vue}"] },
  { 
    languageOptions: { 
      globals: globals.browser 
    },
    plugins: {
      '@stylistic': stylistic
    },
    rules: {
      'indent': ['error', 2],
      '@stylistic/indent': ['error', 2],
    } 
  },
  pluginJs.configs.recommended,
  ...pluginVue.configs["flat/essential"],
];
