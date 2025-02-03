import { test } from '@playwright/test'

import manageCourts from '@steps/pages/courts/manageCourts'
import onehearing from '@test-data/cp/valid-json/one-hearing.json' with { type: "json" };
import { searchForDefendant } from '@steps/search-defendant/search-defendant';
import { getTestConfig } from '@utils/config/testConfig';
import { generateHearing } from "@utils/caseHearingUtils"

const config = getTestConfig()

test.describe('e2e test - send a valid API json(1defendant, 1hearing, 1offence, 1case) request, add court and search for the defendant', () => {
  test('verify the case summary screen - @regression @smoke @apiui', async ({ page, request }) => {
    const generatedName = await generateHearing(request, onehearing)

    //ui journey
    await manageCourts.addCourtToUser(page, "Sheffield Magistrates' Court")
    await searchForDefendant(page, generatedName, 1)
  })
});