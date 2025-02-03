import test, { expect } from "@playwright/test";

export function simpleDefinedTest<T>(name: string, subject: T) {
    test(`${name}`, async () => {
        expect(subject).toBeDefined()
    })
}