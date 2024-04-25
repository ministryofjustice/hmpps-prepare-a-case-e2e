import { Given, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'

Given('I am logged in', async function (this) {

    const { page } = this
    await page.goto(process.env.PREPARE_A_CASE_FOR_SENTENCE_URL)
    await expect(page).toHaveTitle(/HMPPS Digital Services - Sign in/)
    await page.fill('#username', process.env.DELIUS_USERNAME!)
    await page.fill('#password', process.env.DELIUS_PASSWORD!)
    await page.locator('#submit', { hasText: 'Sign in' }).click()
    await expect(page).toHaveTitle('Which courts do you work in? - Prepare a case for sentence')
})

Then('I see the court room hearings page with defendant name {string}', async function (this, defendantName) {

    const { page } = this

    // Locate the row with the given name
    page.locator(`.govuk-table tbody tr:has-text("${defendantName}")`)

})
