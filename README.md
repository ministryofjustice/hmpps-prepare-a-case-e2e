End-to-end tests
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

Create a `.env` file at the root of the project with the following values: