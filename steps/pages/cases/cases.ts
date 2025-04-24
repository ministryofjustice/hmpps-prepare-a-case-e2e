import { Page, expect } from "@playwright/test"

import { countSuffix } from "@utils/textUtils"
import { getTestConfig } from "@utils/config/testConfig"

const config = getTestConfig()

const casesForCourt = async (page: Page, courtCode: string, date?: string) => {
    if (date) {
        expect(date).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    }
    await page.goto(`${config.services.prepareACase.urls.root}/${courtCode}/cases${date ? `/${date}` : ''}`)
}

const caseSummary = async (page: Page, courtCode: string,hearingId: string, defendantId: string) => {
    await page.goto(`${config.services.prepareACase.urls.root}/${courtCode}/hearing/${hearingId}/defendant/${defendantId}/summary`)
}

const verifyDefedantDetails = async (page: Page, defendantFullName: string, probationStatus?: string, offence?: string, listing?: number, session?: string, court?: string) => {
    const tableRow = page.getByRole('row', {exact: false, name: defendantFullName})
    if(await tableRow.count() == 1) {
        console.debug(`Row located for case defendat ${defendantFullName}`)
        expect(tableRow).toBeVisible()
        const rowCells = await tableRow.getByRole('cell').all()
        const expectedColData = [
            { col: 0, value: defendantFullName },
            ...(probationStatus ? [{ col: 1, value: probationStatus }] : []),
            ...(offence ? [{ col: 2, value: offence }] : []),
            ...(listing ? [{ col: 3, value: countSuffix(listing) }] : []),
            ...(session ? [{ col: 4, value: session }] : []),
            ...(court ? [{ col: 5, value: court }] : [])
        ]
        for(const data of expectedColData) {
            expect(rowCells.at(data.col)).toContainText(data.value)
        }
        return true
    } else {
        return false
    }
}

const pageAwareCheck = async (page: Page, toCheckFor: () => Promise<boolean>, failureToSatisfyMessage: string) => {
    const rootPageUrl = page.url()

    let paginationDetails: { available: false } | { available: true, current: 1, totalPages: number }
    const pagination = await page.getByLabel('Pagination')
    if(await pagination.isVisible()) {
        const pageList = await pagination.getByRole('listitem').all()
        const lastPage = await pageList.at(pageList.length - 1).textContent()
        paginationDetails = {
            available: true,
            current: 1,
            totalPages: +lastPage
        }
    } else {
        paginationDetails = {
            available: false
        }
    }

    let satisfied = false
    let furtherPageAvailble = true
    while(!satisfied && furtherPageAvailble) {
        if(paginationDetails.available) {
            console.debug(`Navigating to page ${paginationDetails.current}`)
            await page.goto(`${rootPageUrl}?page=${paginationDetails.current}`)
        }
        satisfied = await toCheckFor()

        furtherPageAvailble = !satisfied && paginationDetails.available && (paginationDetails.current < paginationDetails.totalPages)
        if(furtherPageAvailble && paginationDetails.available) {
            paginationDetails.current++
        }
    }

    if(!satisfied) {
        throw new Error(failureToSatisfyMessage)
    }
}


const cases = {
    pages: {
        casesForCourt,
        caseSummary
    },
    verifyDefedantDetails,
    pageAwareCheck
}

export default cases