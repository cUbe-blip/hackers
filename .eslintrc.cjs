module.exports = {
  extends: ['@nkzw'],
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['**/*.config.{js,cjs,mjs,ts}', 'vite.config.ts'],
        optionalDependencies: false,
        peerDependencies: false,
      },
    ],

    'no-console': 'warn',

    'react-hooks/exhaustive-deps': 'warn', // Checks rules of Hooks
    'react-hooks/rules-of-hooks': 'error', // Checks effect dependencies
  },
  settings: {
    'import/resolver': {
      alias: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        map: [
          ['~API', './src/API'],
          ['~pages', './src/components/Pages'],
          ['~ui', './src/components/UI'],
          ['~constant', './src/Constant'],
          ['~assets', './src/assets'],
        ],
      },
    },
  },
};
