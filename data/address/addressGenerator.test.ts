import test, { expect } from "@playwright/test"
import addressGenerator, { allIncludes } from "./addressGenerator"
import { AddressIncludes } from "./address.d"
import { faker } from "@faker-js/faker"


 test.describe('Address Data Generator', async () => {
    const sut = addressGenerator()

    test.describe('Address options', async () => {
        test('Not specified: default behaviour - address1 & postcode', async () => {
            const result = sut.generate()

            expect(result.address1).toBeDefined()
            expect(result.postCode).toBeDefined()

            expect(result.address2).toBeUndefined()
            expect(result.address3).toBeUndefined()
            expect(result.address4).toBeUndefined()
            expect(result.address5).toBeUndefined()
        })
        test('Include all', async () => {
            const result = sut.generate({ include: 'all' })

            expect(result.address1).toBeDefined()
            expect(result.address2).toBeDefined()
            expect(result.address3).toBeDefined()
            expect(result.address4).toBeDefined()
            expect(result.address5).toBeDefined()
            expect(result.postCode).toBeDefined()          
        })
        test('Include none', async () => {
            const result = sut.generate({ include: 'none' })

            expect(result.address1).toBeDefined()
            expect(result.address2).toBeUndefined()
            expect(result.address3).toBeUndefined()
            expect(result.address4).toBeUndefined()
            expect(result.address5).toBeUndefined()
            expect(result.postCode).toBeDefined()
        })
        test('Include specified list', async () => {
            const randomisedIncludes: AddressIncludes[] = faker.helpers.arrayElements(allIncludes);

            const result = sut.generate({ include: randomisedIncludes })

            randomisedIncludes.includes('address2')
                ? expect(result.address2).toBeDefined()
                : expect(result.address2).toBeUndefined()
            randomisedIncludes.includes('city')
                ? expect(result.address3).toBeDefined()
                : expect(result.address3).toBeUndefined()
            randomisedIncludes.includes('region')
                ? expect(result.address4).toBeDefined()
                : expect(result.address4).toBeUndefined()
            randomisedIncludes.includes('country')
                ? expect(result.address5).toBeDefined()
                : expect(result.address5).toBeUndefined()
        })
    })
})