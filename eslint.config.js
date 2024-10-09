import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';

export default tseslint.config(
  {
    ignores: ['node_modules']
  },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: { ...globals.browser },
      parserOptions: {
        project: ['tsconfig.json']
      }
    },
    rules: {},
    plugins: {
      prettier
    },
    rules: {
      'prettier/prettier': 'error',
      'no-console': 'warn',
      'prefer-const': 'warn'
    }
  }
);
