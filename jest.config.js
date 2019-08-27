// jest.config.js
module.exports = {
  verbose: true,
  rootDir: "/var/task",
  roots:["/tmp","<rootDir>"],
  reporters: ["jest-standard-reporter"],
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
  coverageDirectory: "/tmp",
  // collectCoverageFrom: [
  //   "../test-lambda/*.{js,jsx}",
  //   "!**/node_modules/**",
  //   "!**/vendor/**",
  //   "!**/var/task/**"
  // ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 50,
      lines: 50,
      statements: 0
    }
  }
};
