import { Page } from "@playwright/test"
import { getTestConfig } from "@utils/config/testConfig"

const config = getTestConfig()

const caseSummary = async (page: Page, courtCode: string, hearingId: string, defendantId: string) => {
    await page.goto(`${config.services.prepareACase.urls.root}/${courtCode}/hearing/${hearingId}/defendant/${defendantId}/summary`)
}

const cases = {
    pages: {
        caseSummary
    }
}

export default cases