export type CourtCentreData = {
    code: string,
    name: string
}

export const Coventry: CourtCentreData  = { code: 'B20EB', name: "Coventry Magistrates' Court"}
export const Sheffield: CourtCentreData = { code: 'B14LO', name: "Sheffield Magistrates' Court"}

export const courtCentres: CourtCentreData[] = [
    Coventry,
    Sheffield
]

/**
 * Utilised by tests/e2e/setup/default to set the default courts for the user
 * Once a court is added it cannot be added again as it is removed from the options to add
 * For the time being, this is all Courts as we have so few in scope but could deviate as courtCentres grows
 */

export const defaultCourtCentres: CourtCentreData[] = courtCentres