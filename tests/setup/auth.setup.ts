import { test as setup, expect } from '@playwright/test'
import { STORAGE_STATE } from 'playwright.config'
import { getTestConfig } from '@utils/config/testConfig'

// TODO Can we have a better assertion than the expected title, like identifiying some "is logged in state" on the page
setup('Authenticate', async ({page}) => {
    console.debug('Authenticating test suite')

    const config = getTestConfig()

    await page.goto(config.services.prepareACase.urls.auth)
    await expect(page).toHaveTitle(/HMPPS Digital Services - Sign in/)
    await page.fill('#username', process.env.DELIUS_USERNAME!)
    await page.fill('#password', process.env.DELIUS_PASSWORD!)
    await page.locator('#submit', { hasText: 'Sign in' }).click()
    await expect(page).toHaveTitle('Which courts do you work in? - Prepare a case for sentence')

    await page.context().storageState({ path: STORAGE_STATE })

    console.debug('Test suite successfully authenticated')
})