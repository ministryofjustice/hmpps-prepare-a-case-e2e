import { Page, expect } from "@playwright/test"

const verifyAddressDetails = async (page: Page, expectedAddress: string) => {
    const actualAddress = await page.getByText('Address', { exact: false }).locator('xpath=following-sibling::dd').textContent();
    if (actualAddress.trim() !== expectedAddress.trim()) {
        throw new Error(`Address verification failed: expected "${expectedAddress}", but got "${actualAddress}"`);
    }
    console.log('Address verification passed.');
}

const caseSummary = {

    verifyAddressDetails
}

export default caseSummary