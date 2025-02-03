import { fakerEN_GB as faker } from '@faker-js/faker'
import moment from 'moment'
import { DataGenerator } from '../generators'
import { DATE_OF_BIRTH_FORMAT, Sex, Person, PersonOptions } from './person.d'
import addressGenerator from '@data/address/addressGenerator'
import contactDetailsGenerator from '@data/contactDetails/contactDetailsGenerator'

const personGenerator: () => DataGenerator<Person, PersonOptions> = () => {
    const addressGen = addressGenerator()
    const contactGen = contactDetailsGenerator()
    return {
        generate: (options?) => {
            const sex = faker.helpers.arrayElement(Object.values(Sex))
            let sexForFaker: 'male' | 'female' | undefined = undefined
            switch (sex) {
                case Sex.Male:
                    sexForFaker = 'male'
                    break;
                case Sex.Female:
                    sexForFaker = 'female'
            }

            const dateOfBirth = faker.date.birthdate(
                (options?.dateOfBirth ?? 'adult') == 'adult'
                ? {}
                : { mode: 'age', min: 10, max: 17 } // min: 10?
            )

            return {
                title: faker.person.prefix(sexForFaker),
                firstName: faker.person.firstName(sexForFaker),
                lastName: faker.person.lastName(sexForFaker),
                gender: sex,
                dateOfBirth: moment(dateOfBirth).format(DATE_OF_BIRTH_FORMAT),
                address: addressGen.generate(options?.address),
                contact: contactGen.generate(options?.contactDetails)
            }
        }
    }
}

export default personGenerator