import { test } from '@playwright/test'

import samplevalidjson from '@test-data/cp/valid-json/sample.json' with { type: "json" };
import { searchForDefendant } from '@steps/search-defendant/search-defendant';
import { getTestConfig } from '@utils/config/testConfig';
import { generateHearing } from "@utils/caseHearingUtils"
import { TAGS } from 'tests/tags';
import cases from '@steps/pages/cases/cases';
import { Sheffield } from '@data/courtHearingRequest/courtCentres.data';

const config = getTestConfig()

test.describe('e2e test - send a valid API json(1defendant, 1hearing, 1offence, 1case) request, add court and search for the defendant', () => {
  test('Login, Add Sheffield Court to My Courts and search for the defendant', { tag: [TAGS.ui, TAGS.regression, TAGS.smoke] }, async ({ page, request }) => {
    const generatedName = await generateHearing(request, samplevalidjson)
    const chosenCourt = Sheffield

    //ui journey
    await cases.pages.casesForCourt(page, chosenCourt.code)
    await searchForDefendant(page, generatedName, 3)
  })
});