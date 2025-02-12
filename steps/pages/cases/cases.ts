import { Page, expect } from "@playwright/test"

import { getTestConfig } from "@utils/config/testConfig"

const config = getTestConfig()

const casesForCourt = async (page: Page, courtCode: string, date?: string) => {
    if (date) {
        expect(date).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    }
    await page.goto(`${config.services.prepareACase.urls.root}/${courtCode}/cases${date ? `/${date}` : ''}`)
}
const caseSummary = async (page: Page, courtCode: string, hearingId: string, defendantId: string) => {
    await page.goto(`${config.services.prepareACase.urls.root}/${courtCode}/hearing/${hearingId}/defendant/${defendantId}/summary`)
}

const ensureDefendentExists = async (page: Page, defendantName: string) => {
    const defendantRow = page.getByRole('row', { exact: false, name: defendantName })
    expect(defendantRow).toBeVisible()
    return defendantRow
}

const verifyDefedantDetails = async (page: Page, expectedDefendantFullName: string, expectedProbationStatus?: string, expectedOffence?: string, expectedListing?: number, expectedSession?: string, expectedCourt?: string) => {
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


const cases = {
    pages: {
        casesForCourt,
        caseSummary
    },
    ensureDefendentExists,
    verifyDefedantDetails
}

export default cases