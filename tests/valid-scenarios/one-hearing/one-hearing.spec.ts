import { expect, test } from '@playwright/test'

import { addCourtToUser } from '@steps/my-courts/application'
import onehearing from '@test-data/cp/valid-json/one-hearing.json' with { type: "json" };
import { generateRandomHearingId } from '@utils/generate-random-hearing-id';
import { prepareCaseForSentenceLogin } from '@steps/auth/login'
import { replaceJsonProperty } from "@utils/replace-json-property";
import { searchForDefendant } from '@steps/search-defendant/search-defendant';

let firstName = ""

let lastName = ""

test.describe('e2e test - send a valid API json(1defendant, 1hearing, 1offence, 1case) request, add court and search for the defendant', () => {
  test('Login, Add Sheffield Court to My Courts and search for the defendant @regression @smoke @apiui', async ({ page, request }) => {
    const id = generateRandomHearingId()
    const updatedonehearing = replaceJsonProperty(JSON.stringify(onehearing), `${id}`);

    firstName = onehearing.hearing.prosecutionCases[0].defendants[0].personDefendant.personDetails.firstName;
    lastName = onehearing.hearing.prosecutionCases[0].defendants[0].personDefendant.personDetails.lastName;
    const fullName = firstName + ' ' + lastName;

    const response = await request.post(`${process.env.COURT_HEARING_EVENT_RECEIVER_URL}` + '/hearing/' + `${id}`, {
      headers: { "Authorization": `Bearer ${process.env.TOKEN}`, },
      data: JSON.parse(updatedonehearing)
    })
    expect(response.status()).toBe(200)

    //ui journey
    await prepareCaseForSentenceLogin(page)
    await addCourtToUser(page, "Sheffield Magistrates' Court")
    await searchForDefendant(page, fullName, 1)
  })
});