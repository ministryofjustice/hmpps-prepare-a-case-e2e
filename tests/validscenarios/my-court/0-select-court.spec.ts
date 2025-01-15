import { expect, test } from '@playwright/test'

import { addCourtToUser } from '@steps/my-courts/application'
import dynamicValidJson from '@testdata/cp/validjson/dynamic.json' assert { type: "json" };
import { getCurrentDateTimeYYMMDDHHmmss } from '@utils/date-time';
import { prepareCaseForSentenceLogin } from '@steps/auth/login'
import { stringFormat } from "@utils/string-format";
import { searchForDefendent } from '@steps/search-defendents/searchdefesndent';

let firstname = ""

let lastname = ""

test.describe('e2e test - send a valid API json(1defendent, 1hearning, 1offence, 1case) request, add court and search for the defendent', () => {
test('Login, Add Sheffield Court to My Courts and search for the defendent @regression @smoke @apiui', async ({ page, request }) => {

    // to pass the dynamic value in run time based on index
    const id = getCurrentDateTimeYYMMDDHHmmss()
    const updatedDynamicValidJson = stringFormat(JSON.stringify(dynamicValidJson), `${id}`);

    //console.log(updatedDynamicValidJson);
    firstname = dynamicValidJson.hearing.prosecutionCases[0].defendants[0].personDefendant.personDetails.firstName;

    lastname = dynamicValidJson.hearing.prosecutionCases[0].defendants[0].personDefendant.personDetails.lastName;
    //console.log(firstname);
    const fullName = firstname + ' ' + lastname;
    const response = await request.post("/hearing/" + `${id}`, {
      headers: { "Authorization": `Bearer ${process.env.TOKEN}`, },
      data: JSON.parse(updatedDynamicValidJson)
    })
    expect(response.status()).toBe(200)
    
    await prepareCaseForSentenceLogin(page)
    await addCourtToUser(page, "Sheffield Magistrates' Court")
    await searchForDefendent(page,fullName,3)
})
});