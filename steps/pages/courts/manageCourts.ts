import { expect, Page } from '@playwright/test'
import { getTestConfig } from '@utils/config/testConfig'

const config = getTestConfig()

const myCourts = async (page: Page) => {
    await page.goto(`${config.services.prepareACase.urls.root}/my-courts`)
}
const editCourts = async (page: Page) => {
    await page.goto(`${config.services.prepareACase.urls.root}/my-courts/edit`)
}

const addCourtToUser = async (page: Page, court: string) => {
    await editCourts(page)
    
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

const manageCourts = {
    pages: {
        myCourts,
        editCourts
    },
    addCourtToUser
}

export default manageCourts