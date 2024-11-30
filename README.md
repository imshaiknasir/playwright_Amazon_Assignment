# Playwright Automation Framework

This project is a Playwright automation framework designed to perform end-to-end testing on web applications. The current setup includes tests for Amazon's website.

## Project Setup

To set up the project, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone git@github.com:imshaiknasir/playwright_Amazon_Assignment.git
   cd playwright_Amazon_Assignment
   ```

2. **Install dependencies:**

   Ensure you have Node.js installed on your machine. Then, run the following command to install the necessary dependencies:

   ```bash
   npm install
   ```

3. **Configure Playwright:**

   The Playwright configuration is located in `playwright.config.ts`. You can adjust settings such as the test directory, timeout, viewport size, and more.

## Running the Tests

To execute the tests, you can use the following npm scripts defined in `package.json`:

- **Run all tests:**

  This command will run all the tests in headless mode:

  ```bash
  npm test
  ```

- **Run tests with a report:**

  This command will run the tests and generate a report:

  ```bash
  npm run test:with_report
  ```

- **Run tests in headed mode:**

  If you want to see the browser while the tests are running, use:

  ```bash
  npm run test:headed
  ```

- **View the test report:**

  After running tests with a report, you can view the report using:

  ```bash
  npm run show-report
  ```

## Test Structure

The tests are located in the `tests/` directory. The main test file is `amazon.spec.ts`, which contains a series of steps to automate the search and navigation on Amazon's website.

## Additional Information

- **Playwright Version:** The project uses Playwright version `^1.49.0`.
- **TypeScript Support:** The project is set up with TypeScript, and type definitions for Node.js are included.

For more detailed information on Playwright, visit the [official Playwright documentation](https://playwright.dev/docs/intro).

## Author

Nasir

## License

This project is licensed under the ISC License.
