import { Sheffield } from "@data/courtHearingRequest/courtCentres.data";
import { TAGS } from "tests/tags";
import cases from "@steps/pages/cases/cases";
import courtHearingGenerator from "@data/courtHearingRequest/courtHearingRequestGenerator";
import { searchForDefendant } from "@steps/search-defendant/search-defendant";
import { sendCourtHearingToEventReceiver } from "@steps/_data/data";
import test from "@playwright/test";
import { expect } from '@playwright/test'

const courtHearingGen = courtHearingGenerator()

test.describe('WHEN a hearing note is added to a case summary', async () => {
    test('THEN it should appear on the page', { tag: [TAGS.ui, TAGS.regression, TAGS.smoke] }, async ({ page, request }) => {
        const chosenCourt = Sheffield
        const courtHearingRequest = courtHearingGen.generate({ court: chosenCourt })
        const defendant = courtHearingRequest.hearing.prosecutionCases.at(0).defendants.at(0)
        const person = defendant.personDefendant.personDetails
        const fullName = `${person.firstName} ${person.lastName}`

        await sendCourtHearingToEventReceiver(page, request, courtHearingRequest)
        await cases.pages.casesForCourt(page, chosenCourt.code)
        await searchForDefendant(page, fullName, 1)

        const note = 'Here is a note for this case'
        const form = await page.locator('form[action="summary/notes"]')
        await form.locator('span', { hasText: 'Expand to add a hearing note' }).click()
        await form.getByRole('textbox').fill(note)
        await form.getByRole('button').click()

        await expect(page.getByText(note)).toBeVisible();
    })
})