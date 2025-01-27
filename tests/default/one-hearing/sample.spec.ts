import { test } from '@playwright/test'

import { addCourtToUser } from '@steps/my-courts/application'
import samplevalidjson from '@test-data/cp/valid-json/sample.json' with { type: "json" };
import { searchForDefendant } from '@steps/search-defendant/search-defendant';
import { getTestConfig } from '@utils/config/testConfig';
import { generateHearing } from "@utils/caseHearingUtils"

const config = getTestConfig()

test.describe('e2e test - send a valid API json(1defendant, 1hearing, 1offence, 1case) request, add court and search for the defendant', () => {
  test('Login, Add Sheffield Court to My Courts and search for the defendant @regression @smoke @apiui', async ({ page, request }) => {
    const generatedName = await generateHearing(request, samplevalidjson)

    //ui journey
    await addCourtToUser(page, "Sheffield Magistrates' Court")
    await searchForDefendant(page, generatedName, 3)
  })
});