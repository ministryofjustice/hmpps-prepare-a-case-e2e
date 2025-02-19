import { Page, expect } from "@playwright/test"

const verifyAddressDetails = async (page: Page, expectedAddress: string) => {
    const actualAddress = await page.getByRole('term', { name: 'Address' }).locator('xpath=following-sibling::dd').textContent();
    //const addressValueElement = await page.getByRole('term', { name: 'Address' }).nextElementSibling();
    //const addressValue = await addressValueElement.textContent();
    if (actualAddress !== expectedAddress) {
        throw new Error(`Address verification failed: expected "${expectedAddress}", but got "${actualAddress}"`);
    }
    console.log('Address verification passed.');
    //return actualAddress?.trim() || '';
}

const caseSummary = {

    verifyAddressDetails
}

export default caseSummary