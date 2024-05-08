import { Given, Then ,When} from '@cucumber/cucumber'
import { expect } from '@playwright/test'

    Given('I am an authenticated user', async function (this) {
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

When('I select a {string}', async function (this, courtName) {
    
    const { page } = this
    await page.getByRole('button', { name: /Accept analytics cookies/ }).click()
    await page.focus('#pac-select-court')
    await page.keyboard.type(courtName)
    await page.keyboard.press('Enter')
    await page.getByRole('button', { name: 'Add' }).click()
    await page.locator('[href="?save=true"]', { hasText: 'Save  and continue' }).click()
    await expect(page).toHaveTitle('My courts - Prepare a case for sentence')
    await page.getByRole('link', { name: courtName }).click()
    await expect(page).toHaveTitle('Case list - Prepare a case for sentence')
})
