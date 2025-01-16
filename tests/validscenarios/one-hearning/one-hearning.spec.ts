import { expect, test } from '@playwright/test'

import { addCourtToUser } from '@steps/my-courts/application'
import dynamicValidJson from '@testdata/cp/validjson/dynamic1.json' assert { type: "json" };
import onehearning from '@testdata/cp/validjson/onehearning.json' assert { type: "json" };
import { getCurrentDateTimeYYMMDDHHmmss } from '@utils/date-time';
import { prepareCaseForSentenceLogin } from '@steps/auth/login'
import { stringFormat } from "@utils/string-format";
import { searchForDefendent } from '@steps/search-defendents/searchdefesndent';

let firstName = ""

let lastName = ""

test.describe('e2e test - send a valid API json(1defendent, 1hearning, 1offence, 1case) request, add court and search for the defendent', () => {
  test('Login, Add Sheffield Court to My Courts and search for the defendent @regression @smoke @apiui', async ({ page, request }) => {
    const id = getCurrentDateTimeYYMMDDHHmmss()
    const updatedonehearning = stringFormat(JSON.stringify(onehearning), `${id}`);

    firstName = onehearning.hearing.prosecutionCases[0].defendants[0].personDefendant.personDetails.firstName;
    lastName = onehearning.hearing.prosecutionCases[0].defendants[0].personDefendant.personDetails.lastName;
    const fullName = firstName + ' ' + lastName;

    console.log(firstName)

    const response = await request.post("/hearing/" + `${id}`, {
      headers: { "Authorization": `Bearer ${process.env.TOKEN}`, },
      data: JSON.parse(updatedonehearning)
    })
    expect(response.status()).toBe(200)

    //ui journey
    await prepareCaseForSentenceLogin(page)
    await addCourtToUser(page, "Sheffield Magistrates' Court")
    await searchForDefendent(page, fullName, 1)
  })
});