import { expect, Page } from "@playwright/test"
import { getTestConfig } from "@utils/config/testConfig"

const config = getTestConfig()

const casesForCourt = async (page: Page, courtCode: string, date?: string) => {
    if(date) {
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

const cases = {
    pages: {
        casesForCourt,
        caseSummary
    },
    ensureDefendentExists
}

export default cases