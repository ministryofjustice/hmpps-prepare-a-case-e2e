import { expect, type Page } from '@playwright/test'
import TestConfig from '../../utils/config/testConfig'
import { getTestConfig } from '@utils/config/testConfig'

export async function addCourtToUser(page: Page, court: string) {
    const config = getTestConfig()
    await page.goto(config.services.prepareACase.urls.editCourts)
    await page.getByRole('button', { name: /Accept analytics cookies/ }).click()
    await page.focus('#pac-select-court')
    await page.keyboard.type(court)
    await page.keyboard.press('Enter')
    await page.getByRole('button', { name: 'Add' }).click()
    await page.locator('[href="?save=true"]', { hasText: 'Save  and continue' }).click()
    await expect(page).toHaveTitle('My courts - Prepare a case for sentence')
    await page.getByRole('link', { name: court }).click()
    await expect(page).toHaveTitle('Case list - Prepare a case for sentence')
}