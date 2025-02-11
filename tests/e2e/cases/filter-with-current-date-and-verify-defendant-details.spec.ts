import test, { expect } from "@playwright/test";

import { Sheffield } from "@data/courtHearingRequest/courtCentres.data";
import { TAGS } from "tests/tags";
import courtHearingGenerator from "@data/courtHearingRequest/courtHearingRequestGenerator";
import { filterWithCurrentDate } from "@steps/filter-with-current-date/filter-with-current-date";
import { getTestConfig } from "@utils/config/testConfig";
import manageCourts from "@steps/pages/courts/manageCourts";
import { sendCourtHearingToEventReceiver } from "@steps/_data/data";
import { verifyDefedantDetails } from "@steps/verify-defendant-details/verify-defendant-details"

const courtHearingGen = courtHearingGenerator()
const config = getTestConfig()

test.describe('WHEN a Case and Defendant is added to the Court Hearing Event Receiver', async () => {
    test('THEN filter with current date and verify details of the Defendant in Prepare A Case', { tag: [TAGS.ui, TAGS.regression, TAGS.smoke] }, async ({ page, request }) => {
        const chosenCourt = Sheffield
        const courtHearingRequest = courtHearingGen.generate({ court: chosenCourt })
        const defendant = courtHearingRequest.hearing.prosecutionCases.at(0).defendants.at(0)
        const person = defendant.personDefendant.personDetails
        const fullName = `${person.firstName} ${person.lastName}`

        const offence = courtHearingRequest.hearing.prosecutionCases.at(0).defendants.at(0).offences.at(0).offenceTitle
        const listing = courtHearingRequest.hearing.prosecutionCases.at(0).defendants.at(0).offences.at(0).listingNumber
        const court = courtHearingRequest.hearing.courtCentre.roomName

        await sendCourtHearingToEventReceiver(request, courtHearingRequest)
        await manageCourts.addCourtToUser(page, Sheffield.name)
        await filterWithCurrentDate(page)
        await verifyDefedantDetails(page, fullName, "No record", offence, listing, 'Morning', court)

    })
})