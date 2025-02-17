import test, { expect } from "@playwright/test";

import { Sheffield } from "@data/courtHearingRequest/courtCentres.data";
import { TAGS } from "tests/tags";
import cases from "@steps/pages/cases/cases";
import courtHearingGenerator from "@data/courtHearingRequest/courtHearingRequestGenerator";
import moment from "moment";
import { sendCourtHearingToEventReceiver } from "@steps/_data/data";

const courtHearingGen = courtHearingGenerator()

test.describe('WHEN a Case and Defendant is added to the Court Hearing Event Receiver', async () => {
    test('THEN filter with current date and verify details of the Defendant in Prepare A Case', { tag: [TAGS.ui, TAGS.regression, TAGS.smoke] }, async ({ page, request }) => {
        const chosenCourt = Sheffield
        const courtHearingRequest = courtHearingGen.generate({ court: chosenCourt })
        const defendant = courtHearingRequest.hearing.prosecutionCases.at(0).defendants.at(0)
        const person = defendant.personDefendant.personDetails
        const fullName = `${person.firstName} ${person.lastName}`

        const offence = defendant.offences.at(0).offenceTitle
        const listing = defendant.offences.at(0).listingNumber
        const courtName = courtHearingRequest.hearing.courtCentre.roomName

        await sendCourtHearingToEventReceiver(page, request, courtHearingRequest)
        await cases.pages.casesForCourt(page, chosenCourt.code, moment().format('YYYY-MM-DD'))
        await cases.pageAwareCheck(page,
            () => cases.verifyDefedantDetails(page, fullName, "No record", offence, listing, 'Morning', courtName),
            `Unable to verify details of case entry for ${fullName}`
        )
    })
})