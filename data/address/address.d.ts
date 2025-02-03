import { OptionsNoneOrAll } from "@data/generators"

export type Address = {
    address1: string,
    address2?: string,
    address3?: string,
    address4?: string,
    address5?: string,
    postCode: string
}

export type AddressOptions = {
    include: OptionsNoneOrAll<AddressIncludes>
}

// If updating, consider the includes set of @util/address/addressGenerator
export type AddressIncludes = 'address2' | 'city' | 'region' | 'country'