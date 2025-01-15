import { expect, Page } from '@playwright/test'

export async function addCourtToUser(page: Page, court: string) {
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