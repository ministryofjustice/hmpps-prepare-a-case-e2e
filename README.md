End-to-End tests
for Probation in Court,
written in TypeScript using [Playwright](https://playwright.dev).

These tests are designed to exercise real services in test and pre-production environments.
Testing against real services is particularly useful for highlighting integration issues with authentication, message
queues, external databases etc. - components we can't reliably test using mocks.

## Getting Started

### Dependencies

```shell
# install node and npm (Mac/Linux)
brew install npm

# install project dependencies
npm install

# install browsers
npx playwright install --with-deps
```

> [Node](https://nodejs.org/en/) 16.x or higher is required.
Install the latest version with `brew install npm`, or a specific version with `brew install node@16`.

### Configuration

Create a `.env` file at the root of the project following these values (these pressume that Dev us being used):

```
DELIUS_USERNAME=<delius_username>
DELIUS_PASSWORD=<delius_password>

DELIUS_OAUTHURL = "https://sign-in-dev.hmpps.service.justice.gov.uk/auth/oauth/token"
DELIUS_AUTHORIZATION = "Basic <authorization token>"

AUTH_URL = "https://sign-in-dev.hmpps.service.justice.gov.uk/auth/sign-in?redirect_uri={callback}/login/callback"

COURT_HEARING_EVENT_RECEIVER_URL = "https://court-hearing-event-receiver-dev.hmpps.service.justice.gov.uk" 
COURT_HEARING_EVENT_RECEIVER_ADD = "{rootUrl}/hearing/{id}"

PREPARE_A_CASE_FOR_SENTENCE_URL = "https://prepare-a-case-dev.apps.live-1.cloud-platform.service.justice.gov.uk"
```

## Running Tests

To run all the tests,

```shell
npx playwright test
```

Or to run a subset of tests,

```shell
# by directory
npx playwright test workforce-allocations-to-delius

# by filename
npx playwright test allocate-new-person

# or by test name (-g)
npx playwright test -g 'Allocate previously-managed person'
```

### Debugging

Add the `--headed` option to see the tests running in a browser, or add the `--debug` option to manually step through
each test,

```shell
npx playwright test --headed # watch the test run in your browser
npx playwright test --debug  # step through the test run manually
```

[Tracing](https://playwright.dev/docs/trace-viewer) is enabled by default.
Once your tests have finished running, access the trace viewer by clicking the link at the bottom of the HTML report.
The trace viewer displays a visual timeline of events you can step through to inspect what happened.

## Code Formatting

[ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) are used for linting and formatting.
To fix any issues, run

```shell
npx eslint . --fix
```

Enable the ESLint "fix on save" setting in IntelliJ to fix any formatting issues before committing.
See [Fix problems automatically on save](https://www.jetbrains.com/help/idea/eslint.html#ws_eslint_configure_run_eslint_on_save)

A GitHub Action will fix any missed formatting issues for you when creating a pull request.