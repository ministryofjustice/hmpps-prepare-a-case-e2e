import { ContactDetails, ContactDetailsOptions } from '@data/contactDetails/contactDetails'
import { Address, AddressOptions } from '../address/address.d'

export type Person = {
    title: string,
    firstName: string,
    lastName: string,
    gender: Sex
    dateOfBirth: string,
    address: Address,
    contact: ContactDetails
}

export type PersonOptions = {
    dateOfBirth?: DateOfBirthRange,
    address?: AddressOptions,
    contactDetails?: ContactDetailsOptions
}

export type DateOfBirthRange = 'adult' | 'youth'
export enum Sex {
    Male = 'MALE',
    Female = 'FEMALE',
    NotKnown = 'NOT_KNOWN',
    NotSpecified ='NOT_SPECIFIED'
}

export const DATE_OF_BIRTH_FORMAT = 'YYYY-MM-DD'