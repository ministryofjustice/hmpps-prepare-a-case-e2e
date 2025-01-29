import { OptionsOrAll } from "@data/generators"

export type ContactDetails = {
    home?: string,
    mobile?: string,
    work?: string,
    email?: string
}

export type ContactDetailsOptions = {
    include?: OptionsOrAll<ContactDetailsIncludes>
}

// If updating, consider the includes set of @util/contactDetails/contactDetailsGenerator
export type ContactDetailsIncludes = keyof ContactDetails