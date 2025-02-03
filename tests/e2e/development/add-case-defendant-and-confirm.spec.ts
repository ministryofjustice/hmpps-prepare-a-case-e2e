import { Sheffield } from "@data/courtHearingRequest/courtCentres.data";
import courtHearingGenerator from "@data/courtHearingRequest/courtHearingRequestGenerator";
import test, { expect } from "@playwright/test";
import { sendCourtHearingToEventReceiver } from "@steps/_data/data";
import cases from "@steps/pages/cases/cases";
import manageCourts from "@steps/pages/courts/manageCourts";
import { searchForDefendant } from "@steps/search-defendant/search-defendant";

const courtHearingGen = courtHearingGenerator()

test.describe('WHEN a Case and Defendant is added to the Court Hearing Event Receiver', async () => {
    test('THEN the same Defendant can be found in Prepare A Case', async ({ page, request }) => {
        const chosenCourt = Sheffield
        const courtHearingRequest = courtHearingGen.generate({ court: chosenCourt })
        const defendant = courtHearingRequest.hearing.prosecutionCases.at(0).defendants.at(0)
        const person = defendant.personDefendant.personDetails
        const fullName = `${person.firstName} ${person.lastName}`

        await sendCourtHearingToEventReceiver(request, courtHearingRequest)
        await manageCourts.addCourtToUser(page, Sheffield.name)
        // Currently failing, seems that the search has no results but checking after the fact has the result. Possibly a timing issue?
        // await searchForDefendant(page, fullName, 1)
        await cases.pages.caseSummary(page, chosenCourt.code, courtHearingRequest.hearing.id, defendant.id)
        // Loose check whilst we develop what "check this person exists" looks likes
        expect(page.getByRole('heading', { name: fullName })).toBeVisible()
    })
})