import { test as setup, expect, request } from '@playwright/test';
import TestConfig from '@utils/config/testConfig.d'
import { generateAuthToken } from '@utils/auth/authToken'
import { setTestConfig } from '@utils/config/testConfig'
import { includeSlug } from '@utils/config/configUtils';

setup('Config setup', async ({page}) => {
  console.debug('Setting global test config')

  const authToken = await generateAuthToken(request);
  const prepareACaseRootUrl = process.env.PREPARE_A_CASE_FOR_SENTENCE_URL
  const courtHearingEventReceiverRootUrl = process.env.COURT_HEARING_EVENT_RECEIVER_URL

  const config: TestConfig = {
    auth: {
      token: authToken
    },
    services: {
        courtHearingEventReceiver: {
          urls: {
            root: courtHearingEventReceiverRootUrl,
            addHearing: includeSlug(process.env.COURT_HEARING_EVENT_RECEIVER_ADD, courtHearingEventReceiverRootUrl)
          }
        },
        prepareACase: {
          urls: {
            auth: includeSlug(process.env.AUTH_URL, prepareACaseRootUrl, "callback"),
            root: prepareACaseRootUrl
          }
        }
    }
  }

  setTestConfig(config);

  console.debug('Global test config set')
})