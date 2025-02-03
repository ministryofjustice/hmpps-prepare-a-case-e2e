type TestConfig = {
    auth: {
        token: string
    },
    services: {
        courtHearingEventReceiver: {
            // Example of an external service, urls should be preformatted if possible
            urls: {
                root: string,
                addHearing: string
            }
        },
        prepareACase: {
            // Example of an internal service, keep to basics and steps can manage specifics
            urls: {
                auth: string,
                root: string,
                // editCourts: string
            }
        }
    }
}

export default TestConfig