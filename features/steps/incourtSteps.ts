import { When,Given,Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'

Given('I am viewing the hearing defendant details for {string}', async function (this, defendantName) {

    const { page } = this
    await page.locator('a', { hasText: defendantName }).click()
})

When('I add a note', async function (this) {

    const { page } = this
    const container = await page.locator('.hearing-note-container')
    const form = await container.locator("form[action='summary/notes']")
    await form.locator("[name='name']").fill('my note')
    await form.locator('button').click()
})

When('I edit the note', async function (this) {

    const { page } = this
    const container = await page.locator('.hearing-note-container')
    await container.locator('a', { hasText: 'Edit' }).click()
    const form = await container.locator("form[action='summary/publish-edited-note']")
    await form.locator("[name='name']").fill('my note2')
    await form.locator('button').click()
})

When('I delete the note', async function (this) {

    const { page } = this
    const container = await page.locator('.hearing-note-container')
    await container.locator('a', { hasText: 'Delete' }).click()
    await page.locator('button', { hasText:'Delete note' }).click()
})

Then('I should not see any note', async function (this) {

    const { page } = this
    await expect(page.locator('a', { hasText: 'Delete' })).toHaveCount(0)
})

When('I send the case to {string}', async function (this, outcomeType) {

    const { page } = this
    await page.locator('a', { hasText: 'Send outcome to admin' }).click()
    await page.getByLabel('Outcome type').selectOption({ label: outcomeType })
    await page.locator('button', { hasText:'Send to admin' }).click()
})

Then('the case has moved to hearing outcome {string}', async function (this, outcomeType) {

    const { page } = this
    await expect(page.locator('span', { hasText: outcomeType })).toHaveCount(1)
})

Then('the case for {string} has moved to outcomes', async function (this, defendantName) {

    const { page } = this
    await expect(page.locator('a', { hasText: defendantName })).toHaveCount(1)
})

When('I set the {string} filter to {string}', async function (this, filterName, filterValue) {

    const { page } = this
    await page.getByLabel(filterName).selectOption({ label: filterValue })
    await page.locator('button', { hasText:'Apply filters' }).click()
})

Then('the outcome case count is {number}', async function (this, amount) {

    const { page } = this
    await expect(page.locator('a.pac-defendant-link')).toHaveCount(amount)
})

When('I move the outcome case for defendant {string} to move to in-progress', async function (this, defendantName) {

    const { page } = this
    await page.locator('a', { hasText: defendantName }).click()
    await page.locator('button', { hasText:'Assign to me' }).click()
})

Then('the outcome case for defendant {string} has moved to in-progress', async function () {


})

When('I verify the case count on in-progess tab', async function () {

})


When('I select the filter {string}, {string}, {string}', async function (this,outcomeType,courtRoom,assignedTo) {

})

When('I shoud see the right cases on the page', async function () {

})

When('I click on move to resulted', async function () {

})

When('I verify the cases has been moved to resulted', async function () {

})


When('I shoud see the rigt cases on the page', async function () {

})

When('I click on the hearing date on the resulted page', async function () {

})

When('I should see the case list ordered', async function () {

})
