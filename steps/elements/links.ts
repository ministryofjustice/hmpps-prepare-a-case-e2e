import { expect, Page } from "@playwright/test"

const govukLinkExists = async (page: Page, linkText: string) => {
    const link = page.getByRole('link', { name: linkText })
    await expect(link).toHaveClass(/govuk-link/)
    await expect(link).toBeVisible()
}

export default {
    govukLinkExists
}