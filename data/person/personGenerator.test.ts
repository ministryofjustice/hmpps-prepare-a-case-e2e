import test, { expect } from "@playwright/test";
import personGenerator from "./personGenerator";
import { simpleDefinedTest } from "@data/testUtils";
import moment from "moment";

test.describe('Person Data Generator', () => {
    const sut = personGenerator();

    test.describe('Default fields without options', () => {
        const result = sut.generate()

        simpleDefinedTest('Title', result.title)
        simpleDefinedTest('First name', result.firstName)
        simpleDefinedTest('Last name', result.lastName)
        simpleDefinedTest('Gender', result.gender)
        simpleDefinedTest('Address', result.address)
        simpleDefinedTest('Contact Details', result.contact)
    })

    test.describe('Date of Birth options', async () => {
        const eighteenYearsAgo = moment().add(-18, 'years')
        
        test('None specified: default behaviour - Adult', async () => {
            const result = sut.generate()

            expect(moment(result.dateOfBirth) > eighteenYearsAgo)
        })
        test('Adult specified', async () => {
            const result = sut.generate({ dateOfBirth: 'adult' })

            expect(moment(result.dateOfBirth) > eighteenYearsAgo)
        })
        test('Youth specified', async () => {
            const result = sut.generate({ dateOfBirth: 'youth' })

            expect(moment(result.dateOfBirth) < eighteenYearsAgo)
        })
    })
})