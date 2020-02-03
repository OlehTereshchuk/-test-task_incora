module.exports = {
  extends: '@mate-academy/eslint-config-react',
  rules: {
    "max-len": ["error",  {"code": 100}],
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/no-noninteractive-element-interactions": 0,
  },
};
