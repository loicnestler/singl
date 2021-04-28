module.exports = {
   env: {
      browser: false,
      es6: true,
      node: true
   },
   root: true,
   parser: '@typescript-eslint/parser',
   parserOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      ecmaFeatures: {
         jsx: false
      }
   },
   extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier'
   ],
   rules: {
      'no-unused-vars': 'off',
      'no-nested-ternary': 'off',
      'no-return-await': 'error',
      '@typescript-eslint/no-unused-vars': [
         'error',
         {
            vars: 'all',
            args: 'all',
            argsIgnorePattern: '^_'
         }
      ]
   }
}
