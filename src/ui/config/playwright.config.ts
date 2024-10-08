import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: '../tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  timeout: 40 * 1000,
  expect: {
    timeout: 20000
  },
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: true,
  /* Retry on CI only */
  retries: 1,
  /* Opt out of parallel tests on CI. */
  workers: 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html', { open: 'never', outputFolder: `../../../assets/ui-report-${process.env.test_env || 'tms-main-test'}/playwright-report-${process.env.test_env || 'tms-main-test'}`, outputFile: `html-report-${process.env.test_env || 'tms-main-test'}` }],
  ['allure-playwright', { detail: true, outputFolder: `./assets/ui-report-${process.env.test_env || 'tms-main-test'}/allure-results-${process.env.test_env || 'tms-main-test'}` }]],
  outputDir: `../../../assets/ui-report-${process.env.test_env || 'tms-main-test'}/playwright-results-${process.env.test_env || 'tms-main-test'}`,
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    headless: false,
    trace: 'on',
    video: 'on',
    viewport: { width: 1920, height: 1080 }
  },
  globalSetup: '../../../env/globalSetup.ts',

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'] },
    },

    /*
    {
     name: 'firefox',
     use: { ...devices['Desktop Firefox'] },
   },

   {
     name: 'webkit',
     use: { ...devices['Desktop Safari'] },
   },
   */

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ..devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
