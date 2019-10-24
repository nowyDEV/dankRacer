module.exports = {
  extends: [
    'airbnb',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended'
  ],
  plugins: ['react', '@typescript-eslint', 'prettier', 'react-hooks', 'cypress'],
  settings: {
    react: {
      pragma: 'React',
      version: 'detect'
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  },
  env: { es6: true, browser: true, node: true, jest: true, 'cypress/globals': true },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    'no-bitwise': ['error', { int32Hint: true }],
    'spaced-comment': [
      'error',
      'always',
      {
        markers: ['/']
      }
    ],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'operator-assignment': 0,
    'no-underscore-dangle': 0,
    'consistent-return': 0,
    'global-require': 0,
    'no-param-reassign': [2, { props: false }],
    camelcase: [0, { properties: 'never' }],
    'no-console': 0,
    'no-nested-ternary': 0,
    'lines-between-class-members': 'off',
    'no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true, allowTaggedTemplates: true }],
    'react/default-props-match-prop-types': ['error', { allowRequiredDefaults: true }],
    'react/require-default-props': [2, { forbidDefaultForRequired: false }],
    'react/sort-comp': 0,
    'react/jsx-props-no-spreading': 0,
    'react/state-in-constructor': [2, 'never'],
    'react/destructuring-assignment': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.tsx'] }],
    'react/no-danger': 0,
    'react/jsx-fragments': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/explicit-member-accessibility': 0,
    '@typescript-eslint/explicit-function-return-type': 1,
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    'import/prefer-default-export': 'off',
    'jsx-a11y/label-has-for': 'off'
  }
}
