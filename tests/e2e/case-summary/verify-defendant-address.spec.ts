import { Sheffield } from "@data/courtHearingRequest/courtCentres.data";
import { TAGS } from "tests/tags";
import caseSummary from "@steps/pages/case-summary/case-summary";
import cases from "@steps/pages/cases/cases";
import courtHearingGenerator from "@data/courtHearingRequest/courtHearingRequestGenerator";
import manageCourts from "@steps/pages/courts/manageCourts";
import { searchForDefendant } from "@steps/search-defendant/search-defendant";
import { sendCourtHearingToEventReceiver } from "@steps/_data/data";
import test from "@playwright/test";

const courtHearingGen = courtHearingGenerator()

test.describe('WHEN a Case and Defendant is added to the Court Hearing Event Receiver', async () => {
    test('THEN Navigate to Case Summary Screen and verify the Defendant address', { tag: [TAGS.ui, TAGS.regression, TAGS.smoke] }, async ({ page, request }) => {
        const chosenCourt = Sheffield
        const courtHearingRequest = courtHearingGen.generate({ court: chosenCourt })
        const defendant = courtHearingRequest.hearing.prosecutionCases.at(0).defendants.at(0)
        const person = defendant.personDefendant.personDetails
        const fullName = `${person.firstName} ${person.lastName}`
        const addressValue = person.address.address1

        await sendCourtHearingToEventReceiver(page, request, courtHearingRequest)
        await cases.pages.caseSummary(page, chosenCourt.code)
        await searchForDefendant(page, fullName, 1)
        await caseSummary.verifyAddressDetails(page, addressValue)
    })
})