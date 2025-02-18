import { CourtHearingRequest } from "@data/courtHearingRequest/courtHearingRequest";
import { APIRequestContext, expect, Page } from "@playwright/test";
import { includeSlug } from "@utils/config/configUtils";
import { getTestConfig } from "@utils/config/testConfig";

const config = getTestConfig()

export const sendCourtHearingToEventReceiver = async (page: Page, requestContext: APIRequestContext, courtHearingRequest: CourtHearingRequest) => {
    const response = await requestContext.post(includeSlug(config.services.courtHearingEventReceiver.urls.addHearing, courtHearingRequest.hearing.id, "id"),
    {
        headers: { "Authorization" : `Bearer ${config.auth.token}`},
        data: courtHearingRequest
    })

    expect(response.status()).toEqual(200)

    await page.waitForTimeout(config.services.courtHearingEventReceiver.waitTime)
}