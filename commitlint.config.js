module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [0, 'always'],
    'body-max-length': [0, 'always'],
    'type-enum': [
      2,
      'always',
      [
        'build',
        'change',
        'chore',
        'deprecate',
        'docs',
        'feat',
        'fix',
        'perf',
        'prepare',
        'refactor',
        'remove',
        'revert',
        'security',
        'style',
        'test',
      ],
    ],
  },
};
