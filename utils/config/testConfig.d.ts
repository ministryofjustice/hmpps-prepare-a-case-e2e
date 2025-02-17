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
            waitTime: number
        },
        prepareACase: {
            // Example of an internal service, keep to basics and steps can manage specifics
            urls: {
                auth: string,
                root: string
            }
        }
    }
}

export default TestConfig