import { expect, test } from '@playwright/test'
import personGenerator from '@data/person/personGenerator'
import { DateOfBirthType } from '@data/person/person.d'


// THESE EXIST ONLY TO PUT PROOF TO DEVELOPING THESE GENERATORS
// THEY ARE NOT COMPLETE OR EVEN PARTICULARLY GOOD UNIT TESTS
test.describe('Playing with faker', () => {
    const generator = personGenerator()
    
    test('Default generation', async () => {
        const person = generator.generate()
        // console.log(person)
        expect(person.name).toBeDefined()
        expect(person.name.firstName).toBeDefined()
        expect(person.name.lastName).toBeDefined()
        expect(person.gender).toBeDefined()
        expect(person.dateOfBirth).toBeDefined()
        expect(person.address).toBeDefined()
        expect(person.contact).toBeDefined()
    })

    test('Address - include all', async () => {
        const person = generator.generate({
            address: {
                include: 'all'
            }
        })
        expect(person.address.address2).toBeDefined()
        expect(person.address.address3).toBeDefined()
        expect(person.address.address4).toBeDefined()
        expect(person.address.address5).toBeDefined()
    })

    test('Address - include select', async () => {
        const person = generator.generate({
            address: {
                include: ['city', 'region']
            }
        })
        expect(person.address.address2).toBeUndefined()
        expect(person.address.address3).toBeDefined()
        expect(person.address.address4).toBeDefined()
        expect(person.address.address5).toBeUndefined()
    })

    const yearsAgo18 = new Date()
    yearsAgo18.setFullYear(yearsAgo18.getFullYear() - 18)

    test('Date of Birth - Adult', async () => {
        const person = generator.generate({ dateOfBirth: DateOfBirthType.Adult})
        expect(person.dateOfBirth < yearsAgo18).toBeTruthy()   
    })

    test('Date of Birth - Youth', async () => {
        const person = generator.generate({ dateOfBirth: DateOfBirthType.Youth})
        expect(person.dateOfBirth > yearsAgo18).toBeTruthy()
    })

    test('Contact Details - include all', async () => {
        const person = generator.generate({ contactDetails: { include: 'all' }})
        expect(person.contact).toBeDefined()
        expect(person.contact.home).toBeDefined()
        expect(person.contact.mobile).toBeDefined()
        expect(person.contact.work).toBeDefined()
        expect(person.contact.email).toBeDefined()
    })

    test('Contact Details - select', async () => {
        const person = generator.generate({ contactDetails: { include: ['mobile', 'email'] }})
        expect(person.contact).toBeDefined()
        expect(person.contact.home).toBeUndefined()
        expect(person.contact.mobile).toBeDefined()
        expect(person.contact.work).toBeUndefined()
        expect(person.contact.email).toBeDefined()
    })

    test('Contact Details - defaults', async () => {
        const person = generator.generate()
        expect(person.contact).toBeDefined()
        expect(person.contact.home).toBeDefined()
        expect(person.contact.mobile).toBeDefined()
        expect(person.contact.work).toBeUndefined()
        expect(person.contact.email).toBeUndefined()
    })
})