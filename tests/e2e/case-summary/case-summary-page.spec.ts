import { Sheffield } from '@data/courtHearingRequest/courtCentres.data'
import { TAGS } from 'tests/tags'
import cases from '@steps/pages/cases/cases'
import courtHearingGenerator from '@data/courtHearingRequest/courtHearingRequestGenerator'
import { searchForDefendant } from '@steps/search-defendant/search-defendant'
import { sendCourtHearingToEventReceiver } from '@steps/_data/data'
import { expect, request, test } from '@playwright/test'
import caseSummary from '@steps/pages/case-summary/case-summary'

const courtHearingGen = courtHearingGenerator()
const tag = [TAGS.ui, TAGS.regression, TAGS.smoke]

// Note: the tests pass when run individually, but only the first one will pass when run together

test.describe('Case Summary page', async () => {
    const chosenCourt = Sheffield
    const courtHearingRequest = courtHearingGen.generate({ court: chosenCourt })
    const defendant = courtHearingRequest.hearing.prosecutionCases.at(0).defendants.at(0)
    const person = defendant.personDefendant.personDetails
    const fullName = `${person.firstName} ${person.lastName}`

    test.beforeAll(async () => {
        const apiContext = await request.newContext()
        await sendCourtHearingToEventReceiver(apiContext, courtHearingRequest)
        await apiContext.dispose()
    })

    test.beforeEach(async ({ page }) => {
        await cases.pages.casesForCourt(page, chosenCourt.code)
        await searchForDefendant(page, fullName, 1)
    })

    test('should display defendant details', { tag }, async ({ page }) => {
        await caseSummary.verifyAddressDetails(page, person.address.address1)
    })

    test.describe('when a comment is added to a case summary', async () => {
        test('then it should appear on the page', { tag }, async ({ page }) => {
            const comment = 'Here is a comment for this case'
            const form = await page.locator('form[action="summary/comments"]')
            await form.getByRole('textbox').fill(comment)
            await form.getByRole('button').click();
            await expect(page.getByText(comment)).toBeVisible()
        })
    })

    test.describe('when a hearing note is added to a case summary', async () => {
        test('then it should appear on the page', { tag }, async ({ page }) => {
            const note = 'Here is a note for this case'
            const form = await page.locator('form[action="summary/notes"]')
            await form.locator('span', { hasText: 'Expand to add a hearing note' }).click()
            await form.getByRole('textbox').fill(note)
            await form.getByRole('button').click()

            await expect(page.getByText(note)).toBeVisible()
        })
    })
})