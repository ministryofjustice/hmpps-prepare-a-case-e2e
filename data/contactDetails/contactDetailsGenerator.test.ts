import test, { expect } from "@playwright/test"
import { faker } from "@faker-js/faker"
import contactDetailsGenerator, { allIncludes } from "./contactDetailsGenerator"
import { ContactDetailsIncludes } from "./contactDetails"


 test.describe('Contact Details Data Generator', async () => {
    const sut = contactDetailsGenerator()

    test.describe('Address options', async () => {
        test('Not specified: default behaviour - home & mobile', async () => {
            const result = sut.generate()

            expect(result.home).toBeDefined()
            expect(result.mobile).toBeDefined()

            expect(result.work).toBeUndefined()
        })
        test('Include all', async () => {
            const result = sut.generate({ include: 'all' })

            expect(result.home).toBeDefined()
            expect(result.mobile).toBeDefined()
            expect(result.work).toBeDefined()      
        })
        test('Include none', async () => {
            const result = sut.generate({ include: 'none' })

            expect(result.home).toBeUndefined()
            expect(result.mobile).toBeUndefined()
            expect(result.work).toBeUndefined()
        })
        test('Include specified list', async () => {
            const randomisedIncludes: ContactDetailsIncludes[] = faker.helpers.arrayElements(allIncludes);

            const result = sut.generate({ include: randomisedIncludes })

            randomisedIncludes.includes('home')
                ? expect(result.home).toBeDefined()
                : expect(result.home).toBeUndefined()
            randomisedIncludes.includes('mobile')
                ? expect(result.mobile).toBeDefined()
                : expect(result.mobile).toBeUndefined()
            randomisedIncludes.includes('work')
                ? expect(result.work).toBeDefined()
                : expect(result.work).toBeUndefined()
        })
    })
})