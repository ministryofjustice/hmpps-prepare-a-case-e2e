import { expect, test } from '@playwright/test'

import { addCourtToUser } from '@steps/my-courts/application'
import { prepareCaseForSentenceLogin } from '@steps/auth/login'

test('Login and Add Sheffield Court to My Courts @ui @regression @smoke', async ({ page }) => {
    await prepareCaseForSentenceLogin(page)
    await addCourtToUser(page, "Sheffield Magistrates' Court")
})