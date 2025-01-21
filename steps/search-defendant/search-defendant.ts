import { Page, expect } from '@playwright/test'

export async function searchForDefendant(page: Page, fullName: string, expectedResult?:number) {
    await page.locator('//input[@id="search-term"]').fill(fullName);
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.getByText('Name'), 'Next hearing').toBeVisible();
    const verifySearchResultXpath = page.locator(`(//b[contains(text(),'${expectedResult}')])[2]`).textContent();
    expect(verifySearchResultXpath).toBeTruthy()  
    const defendentLink = page.locator(`(//a[contains(text(), '${fullName}')])[1]`);
    await defendentLink.click();
    await expect(page.getByText('Name'), 'Case summary').toBeVisible();
}