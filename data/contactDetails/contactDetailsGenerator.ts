import { DataGenerator } from "@data/generators";
import { ContactDetails, ContactDetailsIncludes, ContactDetailsOptions } from "./contactDetails";
import { fakerEN_GB as faker } from "@faker-js/faker";
import { resolveIncludeAll } from '@data/utils'

// Consider what we want to be default when nothing is specified
const allIncludes: ContactDetailsIncludes[] = ['home', 'mobile', 'work', 'email']
const defaultIncludes: ContactDetailsIncludes[] = ['home', 'mobile']
// Consider if there is a particualar format we know is ascribed to or do we want this to be random-ish?
const phoneNumberFormat = 'national'

const contactDetailsGenerator: () => DataGenerator<ContactDetails, ContactDetailsOptions> = () => ({
    generate: (options?) => {
        const toInclude = resolveIncludeAll(options?.include, allIncludes, defaultIncludes)
        return {
            ...(toInclude?.includes('home') ?? true ? { home: faker.phone.number({ style: phoneNumberFormat }) } : {}),
            ...(toInclude?.includes('mobile') ?? false ? { mobile: faker.phone.number({ style: phoneNumberFormat }) } : {}),
            ...(toInclude?.includes('work') ?? false ? { work: faker.phone.number({ style: phoneNumberFormat }) } : {}),
            ...(toInclude?.includes('email') ?? false ? { email: faker.internet.email() } : {})
        }
    }
})

export default contactDetailsGenerator