import { Page, expect } from '@playwright/test';

export async function verifyDefedantDetails(page: Page, expectedDefendantFullName: any, expectedProbationStatus?: any, expectedOffence?: any, expectedListing?: any, expectedSession?: any, expectedCourt?: any) {
  let matchFound = false;

  while (!matchFound) {
    const xpathTotalRowCount: number = await page.locator("//tr[@class='govuk-table__row']").count();
    for (let tableRow = 1; tableRow <= xpathTotalRowCount - 1; tableRow++) {
      const actualDefendantFullName = await page.locator(`//tbody/tr[${tableRow}]/td[1]`).textContent();
      if (actualDefendantFullName && actualDefendantFullName.trim() === expectedDefendantFullName) {
        const tableData: string[] = [];
        const xpathTotalDataCount: number = await page.locator(`//tbody/tr[${tableRow}]/td`).count();
        for (let cellData = 1; cellData <= xpathTotalDataCount - 1; cellData++) {
          const xpathCellData = `(//tbody/tr[${tableRow}]/td)[${cellData}]`;
          const element = page.locator(xpathCellData);
          const xpathTableData = await element.textContent();
          if (xpathTableData) {
            const trimmedTableData = xpathTableData.trim();
            tableData.push(trimmedTableData);
            console.debug(`Trimmed value pushed to tableData[${cellData - 1}]:`, trimmedTableData);
          } else {
            throw new Error(`Table data not found for ${xpathCellData}`);
          }
        }
        expect(tableData[0]).toEqual(expectedDefendantFullName);
        expect(tableData[1]).toEqual(expectedProbationStatus);
        expect(tableData[2]).toEqual(expectedOffence);
        expect(tableData[3]).toMatch(new RegExp(expectedListing.toString()));
        expect(tableData[4]).toEqual(expectedSession);
        expect(tableData[5]).toEqual(expectedCourt);

        matchFound = true;
        break;
      }
    }

    if (!matchFound) {
      const nextButton = page.getByRole('link', { name: 'Next   page' });
      if (await nextButton.isVisible()) {
        await nextButton.click();
        await page.waitForLoadState('networkidle');
        await expect(page.getByText('Name'), 'Defendant').toBeVisible();
      } else {
        break;
      }
    }
  }

  if (!matchFound) {
    throw new Error(`No matching row found for name: ${expectedDefendantFullName}`);
  }
}