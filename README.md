### Playwright Automation

Tests powered by Playwright, using the Page Object Model, runnable both locally and in GitHub Actions.

---

## Requirements

- Node.js LTS (latest LTS recommended)

## Installation

```bash
npm install
npm init playwright@latest
```

---

## Environment configuration

Tests are configured via environment variables. Required:

- URL – base address of the application under test (e.g., https://www.saucedemo.com)
- USERNAME – standard user login
- SECOND_USERNAME – locked-out user login (negative scenario)
- PASSWORD – password

PowerShell (Windows):

```powershell
$env:URL="https://www.saucedemo.com"
$env:USERNAME="standard_user"
$env:SECOND_USERNAME="locked_out_user"
$env:PASSWORD="secret_sauce"
```

Note: `playwright.config.ts` reads `process.env.URL` as `baseURL`. Without setting `URL`, navigations such as `page.goto('/')` will fail.

---

## Running tests

Convenience scripts in `package.json`:

- All tests across all projects (desktop + mobile):

```bash
npm test
```

- Desktop only (Chromium, Firefox, WebKit):

```bash
npm run test:web
```

- Single browser:

```bash
npm run test:chromium
npm run test:firefox
npm run test:webkit
```

- Mobile projects:

```bash
npm run test:mobile
# or individually:
npm run test:mobile:chrome
npm run test:mobile:safari
```

- Single file/scenario:

```bash
npx playwright test tests/login.spec.ts -g "User can log in with valid credentials"
```

- Interactive/UI mode:

```bash
npx playwright test --ui
```

---

## Reports

Default reporter is `html`. After the test run:

```bash
npm run report
```

This will open the local HTML report generated in `playwright-report/`.

---

## Project structure

```
Playwright_Automation/
├─ README.md
├─ package.json
├─ fixtures/
│  └─ page.fixture.ts       # Registers Page Objects as fixtures
├─ pages/                   # Page Objects (Login, Inventory, Cart, Checkout, Common)
├─ tests/                   # Test scenarios
├─ test-data/               # Test data (e.g., messages)
├─ playwright.config.ts     # Playwright config (projects, reporter, baseURL, trace)
└─ .github/workflows/       # CI pipeline (GitHub Actions)
```

---

## Playwright configuration

Key settings in `playwright.config.ts`:

- `testDir: './tests'`
- `reporter: 'html'`
- `use.baseURL: process.env.URL`
- `use.trace: 'on-first-retry'`
- `use.screenshot: 'only-on-failure'`
- `use.video: 'retain-on-failure'`
- Projects: `chromium`, `firefox`, `webkit`, `mobile-chrome` (Pixel 5), `mobile-safari` (iPhone 14)
- `retries` and `workers` tuned for CI

---

## CI/CD – GitHub Actions

Workflow: `.github/workflows/playwright-tests-pipeline.yml`

- Manual trigger (`workflow_dispatch`) and schedule (`cron: 30 19 * * *` – daily at 19:30 UTC)
- Matrix: `chromium`, `firefox`, `webkit`, `mobile-chrome`, `mobile-safari`
- Required repository secrets:
  - `URL_SECRET`
  - `USERNAME_SECRET`
  - `SECOND_USERNAME_SECRET`
  - `PASSWORD_SECRET`
- Artifacts: HTML report for each matrix project

---

## Optimization Suggestions

### 1. Code Quality

- **Add ESLint + Prettier**  
  Ensures consistent code style and catches potential issues.

### 2. Automation & CI/CD

- **Integrate with GitHub Actions / GitLab CI**  
  Automatically run tests on each pull request or merge.

- **Slack Integration**  
  Send test result notifications (pass/fail) to a dedicated channel.

### 3. Reporting

- **Allure / Allure TestOps**  
  - Generate detailed reports with screenshots, logs, and test results
  - Upload reports to a real dashboard for team review

### 4. Maintainability & Readability

- **Reusable Fixtures**  
  Share common setup or teardown logic across multiple tests (for example, a fixture for adding a product to the cart could be used across different tests).  

  **Note:** In this small project, reusable fixtures were not demonstrated due to the limited scope, but the structure supports them for future expansion.

### 5. Security / Trace Management

- **Disable trace in production tests**  
  Traces can contain sensitive information such as passwords.  

  **Note:** Trace is intentionally left enabled in this version for demonstration purposes, allowing review of test execution and showcasing functionality.

---
