import { DataGenerator } from "@data/generators";
import { CourtHearingRequest, CourtHearingRequestOptions, HearingSessionTimes, InitiationCode, JurisdictionType } from "./courtHearingRequest.d";
import { faker } from "@faker-js/faker";
import moment from "moment";
import personGenerator from "@data/person/personGenerator";
import offenceGenerator from "@data/offence/offenceGenerator";
import * as CourtCentreData from "./courtCentres.data";

const hearingSessionTimes: HearingSessionTimes = {
    morning: 9,
    afternoon: 15
}

const courtHearingGenerator: () => DataGenerator<CourtHearingRequest, CourtHearingRequestOptions> = () => {
    const offenceGen = offenceGenerator()
    const personGen = personGenerator()
    return {
        generate: (options?) => {

            return {
                hearing : {
                    id: faker.string.uuid(),
                    courtCentre: {
                        id: faker.string.uuid(),
                        code: (options?.court ?? CourtCentreData.Sheffield).code,
                        name: (options?.court ?? CourtCentreData.Sheffield).name,
                        roomId: faker.string.uuid(),
                        roomName: `Room ${faker.number.int({min: 1, max: 3})}-${faker.number.int({min: 1, max: 9})}`
                    },
                    type: {
                        id: faker.string.uuid(),
                        description: "Sentence"
                    },
                    jurisdictionType: JurisdictionType.MAGISTRATES,
                    hearingDays: [{
                        listedDurationMinutes: faker.number.int({ min: 10, max: 60, multipleOf: 10 }),
                        sittingDay: moment()
                            .set('hour', (options?.hearingSession ?? 'morning') ? hearingSessionTimes.morning : hearingSessionTimes.afternoon)
                            .set('minute', 0)
                            .set('seconds', 0)
                            .set('milliseconds', 0)
                            .toISOString()
                    }],
                    prosecutionCases: [{
                        id: faker.string.uuid(),
                        initiationCode: InitiationCode.Charge, // Randomise?
                        prosecutionCaseIdentifier: {
                            prosecutionAuthorityId: faker.string.uuid(),
                            prosecutionAuthorityCode: "CPS", // Randomise?
                            caseURN: faker.helpers.replaceSymbols('##??########')
                        },
                        defendants: [{
                            id: faker.string.uuid(),
                            offences: Array.from(Array(options?.numOfOffences ?? 1)).map(k => offenceGen.generate()),
                            prosecutionCaseId: faker.string.uuid(),
                            personDefendant: {
                                personDetails: personGen.generate(options?.defendant)
                            }
                        }]
                    }]
                }
            }
        }
    }
}

export default courtHearingGenerator