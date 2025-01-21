import { expect, test } from '@playwright/test'

import { addCourtToUser } from '@steps/my-courts/application'
import sampleValidJson from '@test-data/cp/valid-json/sample.json' assert { type: "json" };
import { getCurrentDateTimeYYMMDDHHmmss } from '@utils/date-time';
import { prepareCaseForSentenceLogin } from '@steps/auth/login'
import { stringFormat } from "@utils/string-format";
import { searchForDefendent } from '@steps/search-defendant/search-defendant';

let firstName = ""

let lastName = ""

test.describe('sample test - send a valid API json(1defendent, 1hearning, 1offence, 1case) request, add court and search for the defendent', () => {
  test('Login, Add Sheffield Court to My Courts and search for the defendent @regression @smoke @apiui', async ({ page, request }) => {
    const id = getCurrentDateTimeYYMMDDHHmmss()
    const updatedSampleValidJson = stringFormat(JSON.stringify(sampleValidJson), `${id}`);

    firstName = sampleValidJson.hearing.prosecutionCases[0].defendants[0].personDefendant.personDetails.firstName;
    lastName = sampleValidJson.hearing.prosecutionCases[0].defendants[0].personDefendant.personDetails.lastName;
    const fullName = firstName + ' ' + lastName;

    console.log(firstName)

    const response = await request.post("/hearing/" + `${id}`, {
      headers: { "Authorization": `Bearer ${process.env.TOKEN}`, },
      data: JSON.parse(updatedSampleValidJson)
    })
    expect(response.status()).toBe(200)

    //ui journey
    await prepareCaseForSentenceLogin(page)
    await addCourtToUser(page, "Sheffield Magistrates' Court")
    await searchForDefendent(page, fullName, 3)
  })
});