import { Offence } from "@data/offence/offence"
import { Person, PersonOptions } from "@data/person/person"
import { CourtCentreData } from "./courtCentres.data"

/**
 * This should represent the request sent to the Court Hearing Event Receiver in order to generate a court hearing for testing
 * The full definition of that service's model can be found at:
 * https://github.com/ministryofjustice/court-hearing-event-receiver/blob/main/src/main/kotlin/uk/gov/justice/digital/hmpps/courthearingeventreceiver/model/Hearing.kt
 * 
 * As a staring point ALL fields are being marked as optional so that we can generate these in progressive steps
 * As we discover required fields, they will be made mandatory
 * */

export type CourtHearingRequest = {
    hearing: {
        id: string,
        courtCentre: CourtCentre,
        type: HearingType,
        jurisdictionType: JurisdictionType,
        hearingDays: HearingDay[],
        prosecutionCases: ProsecutionCase[]
    }
}

// Child types. Move to their own space?
type CourtCentre = {
    id: string,
    code: string,
    name: string,
    roomId: string,
    roomName: string
}

type HearingType = {
    id: string,
    description: string
}

export enum JurisdictionType {
    MAGISTRATES = 'MAGISTRATES',
    CROWN = 'CROWN', // Not using yet but will be required in the future
}

type HearingDay = {
    listedDurationMinutes: number,
    sittingDay: string, //LocalDateTime in CHER - We want this to be the day in question at either 09:00 or 15:00
}

type ProsecutionCase = { // Hard code most of this expext the defendant as that is what we get out on our end
    id: string,
    initiationCode: InitiationCode,
    prosecutionCaseIdentifier: ProsecutionCaseIdentifier,
    defendants: Defendant[]
}

export enum InitiationCode {
    SJPNotice = 'J',
    Requesition = 'Q',
    Summons = 'S',
    Charge = 'C', // This is the value in the example, do we require any others?
    Remitted = 'R',
    Other = 'O',
    SJPReferral = 'Z'
}
type ProsecutionCaseIdentifier = {
    prosecutionAuthorityId: string,
    prosecutionAuthorityCode: string,
    caseURN: string
}
type Defendant = {
    id: string,
    offences: Offence[], // static data for now
    prosecutionCaseId: string,
    personDefendant: {
        personDetails: Person
    }
}


export type CourtHearingRequestOptions = {
    court: CourtCentreData
    hearingSession?: keyof HearingSessionTimes
    numOfOffences?: number // Temp just a number until we have something to configure on offences
    defendant?: PersonOptions
}
export type HearingSessionTimes = {
    morning: number,
    afternoon: number
}