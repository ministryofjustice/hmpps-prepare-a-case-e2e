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