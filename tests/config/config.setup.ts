import { test as setup, expect, request } from '@playwright/test';
import TestConfig from '@utils/config/testConfig.d'
import { generateAuthToken } from '@utils/auth/authToken'
import { setTestConfig } from '@utils/config/testConfig'

const includeSlug = (urlToUpdate: string, slug: string, slugKey: string = 'rootUrl') =>
  urlToUpdate.replace(`{${slugKey}}`, slug)

setup('Config setup', async ({page}) => {
  console.debug('Setting global test config')

  const authToken = await generateAuthToken(request);
  const prepareACaseRootUrl = process.env.PREPARE_A_CASE_FOR_SENTENCE_URL

  const config: TestConfig = {
    auth: {
      token: authToken
    },
    services: {
        courtHearing: {
          urls: {
            eventReceiver: process.env.COURT_HEARING_EVENT_RECEIVER_URL
          }
        },
        prepareACase: {
          urls: {
            auth: includeSlug(process.env.AUTH_URL, prepareACaseRootUrl, "callback"),
            root: prepareACaseRootUrl,
            editCourts: includeSlug(process.env.PREPARE_A_CASE_FOR_SENTENCE_EDIT_COURTS_URL, prepareACaseRootUrl)
          }
        }
    }
  }

  setTestConfig(config);

  console.debug('Global test config set')
})