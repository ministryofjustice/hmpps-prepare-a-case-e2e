import { type Page, expect } from '@playwright/test'

export async function searchForDefendant(page: Page, fullName: string, expectedResult?:number) {
    await page.locator('//input[@id="search-term"]').fill(fullName);
    //page.getByRole('row', { exact: false, name: fullName })
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.getByText('Name'), 'Defendant').toBeVisible();
    const verifySearchResultXpath = page.locator(`(//b[contains(text(),'${expectedResult}')])[2]`).textContent();
    expect(verifySearchResultXpath).toBeTruthy()
    const defendantLink = page.getByRole('link', { name: fullName, exact: false }).first();  
    //const defendantLink = page.locator(`(//a[contains(text(), '${fullName}')])[1]`);
    await defendantLink.click();
    await expect(page.getByText('Name'), 'Case summary').toBeVisible();
}