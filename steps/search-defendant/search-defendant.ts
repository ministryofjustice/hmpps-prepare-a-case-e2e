import { type Page, expect } from '@playwright/test'

export async function searchForDefendant(page: Page, fullName: string, expectedResult?: number) {
    await page.getByRole('textbox', { name: 'Enter the CRN or full name of' }).fill(fullName);
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.getByText('Name'), 'Defendant').toBeVisible();
    const verifySearchResult = page.locator(`(//b[contains(text(),'${expectedResult}')])[2]`).textContent();
    expect(verifySearchResult).toBeTruthy()
    const defendantLink = page.getByRole('link', { name: fullName, exact: false }).first();
    await defendantLink.click();
    await expect(page.getByText('Name'), 'Case summary').toBeVisible();
}