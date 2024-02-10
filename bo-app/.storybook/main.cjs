// .storybook/main.js|ts
const { mergeConfig, loadConfigFromFile } = require('vite');
const path = require('path');

module.exports = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    'storybook-dark-mode',
  ],
  core: {
    builder: '@storybook/builder-vite', // 👈 The builder enabled here.
  },
  async viteFinal(config) {
    const _config = await loadConfigFromFile(
      path.resolve(__dirname, '../vite.config.ts'),
    );

    // Merge custom configuration into the default config
    return mergeConfig(config, {
      // Use the same "resolve" configuration as your app
      resolve: _config?.config?.resolve,
    });
  },
};
