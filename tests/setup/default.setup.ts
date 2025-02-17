import { Coventry, defaultCourtCentres, Sheffield } from '@data/courtHearingRequest/courtCentres.data'
import { test as setup } from '@playwright/test'
import manageCourts from '@steps/pages/courts/manageCourts'

setup('Set default user courts', async ({ page }) => {
    console.debug('Setting default user courts:')
    console.debug(defaultCourtCentres.reduce((acc, cur, i) => `${acc}${i > 0 ? `, ` : ''}${cur.name} (${cur.code})`, 'Courts to register: '))
    const courtNames = defaultCourtCentres.map(c => c.name)
    await manageCourts.addCourtsToUser(page, courtNames)
    await manageCourts.verifyUserCourts(page, courtNames)
})