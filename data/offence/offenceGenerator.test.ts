import test, { expect } from "@playwright/test";
import offenceGenerator from "./offenceGenerator";
import { simpleDefinedTest } from "@data/testUtils";

test.describe('Offence Generator', async () => {
    const sut = offenceGenerator()

    test.describe('Default field: currently no options as data is primarily static', async () => {
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
})