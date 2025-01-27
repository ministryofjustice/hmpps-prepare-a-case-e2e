type TestConfig = {
    auth: {
        token: string
    },
    services: {
        courtHearing: {
            urls: {
                eventReceiver: string
            }
        },
        prepareACase: {
            urls: {
                auth: string,
                root: string,
                editCourts: string
            }
        }
    }
}

export default TestConfig