import { expect, Page } from "@playwright/test"

const exists = async (page: Page, level: number, text?: string) => {
    const options = {
        level,
        ...(text ? { name: text } : {})
    }
    await expect(page.getByRole('heading', options)).toBeVisible()
}

export default {
    exists
}