import { Page, expect } from '@playwright/test'

import { getTestConfig } from '@utils/config/testConfig'
import headings from '@steps/elements/headings'
import links from '@steps/elements/links'

const config = getTestConfig()

const myCourts = async (page: Page) => {
    await page.goto(`${config.services.prepareACase.urls.root}/my-courts`)
}
const editCourts = async (page: Page) => {
    await page.goto(`${config.services.prepareACase.urls.root}/my-courts/edit`)
}

const addCourtToUser = async (page: Page, courtName: string) => {
    await addCourtsToUser(page, [courtName])
}

const addCourtsToUser = async (page: Page, courtsNames: string[]) => {
    await editCourts(page)
    for (const name of courtsNames) {
        await page.getByRole('combobox').fill(name)
        await page.keyboard.press('Enter')
        await page.getByRole('button', { name: 'Add' }).click()
    }
    await page.getByRole('button', { name: 'Save list and continue' }).click()
}

const verifyUserCourts = async (page: Page, courtNames: string[]) => {
    await headings.exists(page, 1, 'My courts')
    for (const name of courtNames) {
        await links.govukLinkExists(page, name)
    }
}

const manageCourts = {
    pages: {
        myCourts,
        editCourts
    },
    addCourtToUser,
    addCourtsToUser,
    verifyUserCourts
}

export default manageCourts