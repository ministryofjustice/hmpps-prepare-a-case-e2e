import { When } from '@cucumber/cucumber'
import { expect } from '@playwright/test'

When('I select court {string}', async function (this, courtName) {
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
