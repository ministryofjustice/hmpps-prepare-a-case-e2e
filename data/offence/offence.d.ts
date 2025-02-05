export type Offence = {
    id: string,
    offenceDefinitionId: string,
    offenceCode: string,
    offenceTitle: string,
    wording: string,
    offenceLegislation: string,
    listingNumber: number,
    judicialResults: JudicialResult[],
    plea: {
        pleaValue: string
    },
    verdict: {
        verdictType: {
            description: string
        }
    }
}

export type JudicialResult = {
    isConvictedResult: boolean,
    label: string,
    judicialResultTypeId: string
    resultText: string,
}

export type OffenceOptions = {
    listingNumber?: number
}