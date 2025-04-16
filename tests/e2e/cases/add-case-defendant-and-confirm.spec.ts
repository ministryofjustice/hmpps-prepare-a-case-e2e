import test from "@playwright/test";
import { Sheffield } from "@data/courtHearingRequest/courtCentres.data";
import cases from "@steps/pages/cases/cases";
import courtHearingGenerator from "@data/courtHearingRequest/courtHearingRequestGenerator";
import manageCourts from "@steps/pages/courts/manageCourts";
import { sendCourtHearingToEventReceiver } from "@steps/_data/data";
import moment from "moment";
import { TAGS } from "tests/tags";

const courtHearingGen = courtHearingGenerator()

test.describe('WHEN a Case and Defendant is added to the Court Hearing Event Receiver', async () => {
    test('THEN the same Defendant can be found in Prepare A Case', { tag: [TAGS.ui, TAGS.regression, TAGS.smoke] }, async ({ page, request }) => {
        const chosenCourt = Sheffield
        const courtHearingRequest = courtHearingGen.generate({ court: chosenCourt })
        const defendant = courtHearingRequest.hearing.prosecutionCases.at(0).defendants.at(0)
        const person = defendant.personDefendant.personDetails
        const fullName = `${person.firstName} ${person.lastName}`

        await sendCourtHearingToEventReceiver(page, request, courtHearingRequest)
        
        await cases.pages.casesForCourt(page, chosenCourt.code, moment().format('YYYY-MM-DD'))
        await cases.pageAwareCheck(page,
            () => cases.ensureDefendentExists(page, fullName),
            `Unable to locate and confirm case entry for defendant ${fullName}`
        )
    })
})