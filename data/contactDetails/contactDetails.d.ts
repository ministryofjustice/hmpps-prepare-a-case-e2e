import { OptionsNoneOrAll } from "@data/generators"

export type ContactDetails = {
    home?: string,
    mobile?: string,
    work?: string
}

export type ContactDetailsOptions = {
    include?: OptionsNoneOrAll<ContactDetailsIncludes>
}

// If updating, consider the includes set of @util/contactDetails/contactDetailsGenerator
export type ContactDetailsIncludes = keyof ContactDetails