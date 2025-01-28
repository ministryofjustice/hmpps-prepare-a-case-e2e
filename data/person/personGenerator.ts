import { fakerEN_GB as faker } from '@faker-js/faker'
import { DataGenerator } from '../generators'
import { DateOfBirthType, Person, PersonOptions } from './person.d'
import addressGenerator from '@data/address/addressGenerator'
import contactDetailsGenerator from '@data/contactDetails/contactDetailsGenerator'

const personGenerator: () => DataGenerator<Person, PersonOptions> = () => {
    const addressGen = addressGenerator()
    const contactGen = contactDetailsGenerator()
    return {
        generate: (options: PersonOptions) => {
            /**
             * The UI accounts for a primary property named "defendantSex"
             * This does not appear on any of our examples but has the expected value options of:
             * "M" => Male, "F" => Female, "NS" => Not Specified or allows to fall through to Unknown for none of these
             * Need to try and track how that value when we are rendering relates to this data on a hearing
             * as it comes back to us from the Court Case Service
             */ 
            const sex = faker.person.sexType()

            return {
                name: {
                    firstName: faker.person.firstName(sex),
                    lastName: faker.person.lastName(sex),
                },
                gender: sex,
                dateOfBirth: faker.date.birthdate((options?.dateOfBirth ?? DateOfBirthType.Adult) == DateOfBirthType.Adult ? {} : { mode: 'age', min: 8, max: 17 }), // min? realistic age at which someone could be a part of this system?
                address: addressGen.generate(options?.address),
                contact: contactGen.generate(options?.contactDetails)
            }
        }
    }
}

export default personGenerator