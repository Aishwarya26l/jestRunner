// jest.config.js
module.exports = {
  verbose: true,
  rootDir: "/tmp/example",
  reporters: ["jest-standard-reporter"],
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
  coverageDirectory: "/tmp/example",
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 50,
      lines: 50,
      statements: 0
    }
  }
};
