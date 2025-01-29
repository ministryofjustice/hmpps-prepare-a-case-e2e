import { ContactDetails, ContactDetailsOptions } from '@data/contactDetails/contactDetails'
import { Address, AddressOptions } from '../address/address.d'

export type Person = {
    name: {
        firstName: string,
        lastName: string
    },
    gender: string
    dateOfBirth: Date,
    address: Address,
    contact: ContactDetails
}

export type PersonOptions = {
    dateOfBirth?: DateOfBirthType,
    address?: AddressOptions,
    contactDetails?: ContactDetailsOptions
}

// An alternative to unioned type values. Do we have a preference?
export enum DateOfBirthType {
    Adult,
    Youth
}