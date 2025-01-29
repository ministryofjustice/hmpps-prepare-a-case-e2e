import { DataGenerator } from "@data/generators";
import { Address, AddressOptions, AddressIncludes } from "./address";
import { fakerEN_GB as faker } from "@faker-js/faker";
import { resolveIncludeAll } from "@data/utils";

const allIncludes: AddressIncludes[] = ['address2', 'city', 'region', 'country']

const addressGenerator: () => DataGenerator<Address, AddressOptions> = () => ({
    generate: (options?) => {
        const toInclude = resolveIncludeAll(options?.include, allIncludes)
        return {
            address1: faker.location.streetAddress(),
            ...(toInclude?.includes('address2') ?? false ? { address2: faker.location.secondaryAddress()} : {}),
            ...(toInclude?.includes('city') ?? false ? { address3: faker.location.city()} : {}),
            ...(toInclude?.includes('region') ?? false ? { address4: faker.location.county()} : {}),
            ...(toInclude?.includes('country') ?? false ? { address5: faker.location.state()} : {}),
            postCode: faker.location.zipCode()
        }
}
})

export default addressGenerator