import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './tests',
  timeout: 30 * 1000,
  use: {
    headless: true,
    viewport: { width: 1366, height: 768 },
    screenshot: 'on',
    trace: 'on',
    baseURL: 'https://www.amazon.in'
  },
  reporter: [
    ['html', { outputFolder: 'reports', open: 'never' }],
    ['list']
  ],
};

export default config;
