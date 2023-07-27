This folder contains sample automated UI tests for https://www.saucedemo.com/ page

Programming language used: TypeScript 5.1 Web testing framework: Playwright 1.35

Running Tests: The following steps should get you set up to run tests locally on your machine:

1. Clone this repository to your local machine - "git clone" https://github.com/ALazarchik/igns-task-web.git
2. Open up a terminal and install project dependencies using the following command: "npm install"
3. Run the tests from the command line - "npm run test:headed" for headed mode OR "npm run test:headless" for headless mode
4. If test failures occur, the HTML report will be opened automatically in your default browser. The screenshots for
failed tests will be provided in corresponding test description. If you want to open the last report manually, please, run the following command from the command line - "npm run report"