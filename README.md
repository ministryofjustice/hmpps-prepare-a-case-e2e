# PACFS End-to-end Tests

This implementation is a first pass and you may find you need to improve some aspects. At the time of writing CucumberJS
needs ESM loading for TS which has some drawbacks, and there may be a better way. Making it load a step file 
specific to a feature file has proved troublesome, something which cypress-cucumber-js author resolved by writing
a custom file loader. 

# Dependencies

```shell
# install project dependencies
npm i

# install browsers
npx playwright i --with-deps
```

If the last command keeps timing out use `/scripts/playwright-browser-install` as an alternative.

> [Node](https://nodejs.org/en/) 20.x or higher is required.
Install the latest version with `brew install npm`, or a specific version with `brew install node@20`.

# Configuration

Create a `.env` file at the root of the project with the following values:

```
DELIUS_USERNAME=DeliusUsername
DELIUS_PASSWORD=DeliusPassword
PREPARE_A_CASE_FOR_SENTENCE_URL=https://********.apps.live-1.cloud-platform.service.justice.gov.uk
```

# Running Tests

To run all the tests,

```shell
nppm start
```

# Code Formatting

[ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) are used for linting and formatting.
To fix any issues, run

```shell
npx eslint . --fix
```

Enable the ESLint "fix on save" setting in IntelliJ to fix any formatting issues before committing.
See [Fix problems automatically on save](https://www.jetbrains.com/help/idea/eslint.html#ws_eslint_configure_run_eslint_on_save)

A GitHub Action will fix any missed formatting issues for you when creating a pull request.