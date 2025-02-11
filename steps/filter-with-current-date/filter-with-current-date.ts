import test, { Page, expect } from "@playwright/test";

import { Sheffield } from "@data/courtHearingRequest/courtCentres.data";
import courtHearingGenerator from "@data/courtHearingRequest/courtHearingRequestGenerator";
import { getTestConfig } from "@utils/config/testConfig";

const config = getTestConfig()
const courtHearingGen = courtHearingGenerator()

export async function filterWithCurrentDate(page: Page) {
    const chosenCourt = Sheffield
    const courtHearingRequest = courtHearingGen.generate({ court: chosenCourt })
    const sittingDay = courtHearingRequest.hearing.hearingDays.at(0).sittingDay
    const currentDate = sittingDay.substring(0,10)
    await page.goto(`${config.services.prepareACase.urls.root}/${chosenCourt.code}/cases/${currentDate}`)

}