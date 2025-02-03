import { DataGenerator } from "@data/generators";
import { Offence } from "./offence";
import { faker } from "@faker-js/faker";

/**
 * Note, this data will be largely static until we have gather a working set of plausidble date sets
 * at which point it can be expanded
 */
const offenceGenerator: () => DataGenerator<Offence, {}> = () => {
    return {
        generate: () => {
            return {
                id: faker.string.uuid(),
                offenceDefinitionId: faker.string.uuid(),
                offenceCode: "OF61102",
                offenceTitle: "Assault a person thereby occasioning them actual bodily harm",
                wording: "On 25/11/2023 at Oxford,  you assaulted John Smith, thereby occasioning him, actual bodily harm",
                offenceLegislation: "Contrary to section 47 of the Offences Against the Person Act 1861.",
                listingNumber: faker.number.int({ min: 1, max: 9}),
                judicialResults: [{
                    isConvictedResult: false,
                    label: "Test judicial result's label",
                    judicialResultTypeId: faker.string.uuid(),
                    resultText: "Test judicial result's result text"
                }],
                plea: {
                    pleaValue: "not guilty"
                },
                verdict: {
                    verdictType: {
                        description: "verdict"
                    }
                }
            }
        }
    }
}

export default offenceGenerator