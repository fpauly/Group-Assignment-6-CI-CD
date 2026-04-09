# Group-Assignment-6-CI-CD

A simple Node.js calculator application demonstrating CI/CD practices using GitHub Actions.

## Application

This project contains a `Calculator` module (`src/calculator.js`) that exposes four arithmetic operations:

| Function | Description |
|---|---|
| `add(a, b)` | Returns `a + b` |
| `subtract(a, b)` | Returns `a - b` |
| `multiply(a, b)` | Returns `a * b` |
| `divide(a, b)` | Returns `a / b`; throws if `b === 0` |

## Getting Started

```bash
# Install dependencies
npm install

# Run the demo
npm start

# Run tests with coverage
npm test

# Lint the source code
npm run lint
```

## CI/CD Pipeline

### Continuous Integration (`ci.yml`)

Triggered on every push and pull request to `main`.

| Job | Description |
|---|---|
| **Lint** | Runs ESLint against `src/` to enforce code style |
| **Test** | Runs Jest with coverage on Node.js 18, 20, and 22 in parallel |

The coverage report is uploaded as a GitHub Actions artifact when running on Node.js 20.

### Continuous Deployment (`cd.yml`)

Triggered on every push to `main` (and manually via `workflow_dispatch`).

Runs lint → test → `npm start` in sequence to verify the application is production-ready before deployment.

## Project Structure

```
.
├── .github/
│   └── workflows/
│       ├── ci.yml        # Continuous Integration workflow
│       └── cd.yml        # Continuous Deployment workflow
├── src/
│   ├── __tests__/
│   │   └── calculator.test.js
│   ├── calculator.js     # Core calculator module
│   └── index.js          # Entry point / demo
├── .gitignore
├── eslint.config.js
├── package.json
└── README.md
```
