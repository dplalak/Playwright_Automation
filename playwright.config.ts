import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  
  testDir: './tests',

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 3 : undefined,

  reporter: 'html',

  use: {
    baseURL: process.env.URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    { name: 'mobile-chrome',
      use: {
        browserName: 'chromium',
        ...devices['Pixel 5'],
        viewport: { width: 393, height: 851 },
      } 
    },

    { name: 'mobile-safari',
      use: {
        browserName: 'webkit',
        ...devices['iPhone 14'],
        viewport: { width: 390, height: 844 },
      } 
    },
  ]
});
