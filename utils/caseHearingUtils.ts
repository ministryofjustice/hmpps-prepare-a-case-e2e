import { APIRequestContext, expect } from '@playwright/test';
import { getTestConfig } from './config/testConfig';
import { generateRandomHearingId } from './generate-random-hearing-id'
import { replaceJsonProperty } from './replace-json-property'

export const generateHearing = async (request: APIRequestContext, hearing: any) => {
    const config = getTestConfig();
    const id = generateRandomHearingId()
    const updatedonehearing = replaceJsonProperty(JSON.stringify(hearing), `${id}`);

    const firstName = hearing.hearing.prosecutionCases[0].defendants[0].personDefendant.personDetails.firstName;
    const lastName = hearing.hearing.prosecutionCases[0].defendants[0].personDefendant.personDetails.lastName;
    const fullName = firstName + ' ' + lastName;

    const response = await request.post(`${config.services.courtHearingEventReceiver.urls.root}` + '/hearing/' + `${id}`, {
      headers: { "Authorization": `Bearer ${config.auth.token}`, },
      data: JSON.parse(updatedonehearing)
    })
    expect(response.status()).toBe(200)

    return fullName
}

export default {
  generateHearing
}