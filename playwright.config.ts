import { devices, type PlaywrightTestConfig } from '@playwright/test'
import dotenv from 'dotenv'

// Read from ".env" file.
dotenv.config({ path: '.env' })

export const STORAGE_STATE = "bin/.state/state.json";//path.join(__dirname, ".run/auth/user.json");

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
    globalSetup: './access-token.ts',
    testDir: process.env.TEST_DIR ? process.env.TEST_DIR : './tests',
    /* Maximum time one test can run for. */
    timeout: 180000,
    /* Maximum time test suite can run for. */
    globalTimeout: 3600000,
    /* Run tests in files in parallel */
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 1 : 0,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: 'html',
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        storageState: STORAGE_STATE,
        actionTimeout: 1800000,
        timezoneId: 'Europe/London',
        launchOptions: { slowMo: 150 },
        screenshot: 'only-on-failure',
        trace: process.env.CI ? 'off' : 'on',
        ...devices['Desktop Chrome'],
    },

    /* Configure projects */
    projects: [
        {
            name: 'config',
            testMatch: '**/config/**/*.setup.ts'
        },
        {
            name: 'setup',
            testMatch: '**/setup/**/*.setup.ts',
            dependencies: ['config']
        },
        {
            name: 'default',
            testMatch: '**/*.spec.ts',
            dependencies: ['setup'],
            use: {
                storageState: STORAGE_STATE
            }
        }
    ],
}

export default config
