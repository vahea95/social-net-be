module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'unicorn', 'sonarjs'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:security/recommended',
    'plugin:sonarjs/recommended',
  ],
  overrides: [
    {
      files: ['*.test.ts'],
      rules: {
        'max-lines-per-function': [
          'error',
          {max: 100, skipBlankLines: true, skipComments: true, IIFEs: true},
        ],
      },
    },
    {files: ['migrations/*.ts'], rules: {'unicorn/filename-case': 'off'}},
  ],
  root: true,
  env: {node: true, jest: true},
  ignorePatterns: ['dist', '.eslintrc.js'],
  rules: {
    'sonarjs/no-duplicate-string': 'off',
    'sonarjs/prefer-immediate-return': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {argsIgnorePattern: '^_', ignoreRestSiblings: true},
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      {selector: ['enum', 'enumMember'], format: ['PascalCase']},
    ],
    '@typescript-eslint/no-restricted-imports': 'error',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    'max-lines': ['error', 600],
    'max-params': ['error', {max: 3}],
    'max-lines-per-function': [
      'error',
      {max: 40, skipBlankLines: true, skipComments: true, IIFEs: true},
    ],
    'unicorn/filename-case': ['error', {case: 'kebabCase'}],
    'no-console': 'error',
  },
}
