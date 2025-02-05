import test, { expect } from "@playwright/test";
import offenceGenerator from "./offenceGenerator";
import { simpleDefinedTest } from "@data/testUtils";
import { faker } from "@faker-js/faker";

test.describe('Offence Generator', async () => {
    const sut = offenceGenerator()

    test.describe('Default fields without options', async () => {
        const result = sut.generate()

        // Merely check a value has been provided for these fields, currently not logic involved
        expect(result).toBeDefined()
        simpleDefinedTest('Id', result.id)
        simpleDefinedTest('Definition Id', result.offenceDefinitionId)
        simpleDefinedTest('Code', result.offenceCode)
        simpleDefinedTest('Title', result.offenceTitle)
        simpleDefinedTest('Wording', result.wording)
        simpleDefinedTest('Legislation', result.offenceLegislation)
        simpleDefinedTest('Listing Number', result.listingNumber)
        
        test('Judicial Results', async () => {
            expect(result.judicialResults).toBeDefined()
            expect(result.judicialResults).toHaveLength(1)
            const judicialResult = result.judicialResults.at(0)
            expect(judicialResult.isConvictedResult).toBeFalsy()
            expect(judicialResult.label).toBeDefined()
            expect(judicialResult.judicialResultTypeId).toBeDefined()
            expect(judicialResult.resultText).toBeDefined()
        })
        test('Plea', async () => {
            expect(result.plea).toBeDefined()
            expect(result.plea.pleaValue).toBeDefined()
        })
        test('Verdict', async () => {
            expect(result.verdict).toBeDefined()
            expect(result.verdict.verdictType).toBeDefined()
            expect(result.verdict.verdictType.description).toBeDefined()
        })
    })

    test.describe('Listing Number Options', async () => {
        test('None specified: default behaviour - 1', async () => {
            const result = sut.generate()

            expect(result.listingNumber).toEqual(1)
        })
        test('Listing Number specified', async () => {
            const randomListingNumber = faker.number.int({ min: 2, max: 9 })
            const result = sut.generate({ listingNumber: randomListingNumber })

            expect(result.listingNumber).toEqual(randomListingNumber)
        })
    })
})