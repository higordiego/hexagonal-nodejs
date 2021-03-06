/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

module.exports = {
  preset: 'ts-jest',
  clearMocks: true,
  collectCoverage: true,
  testMatch: ['**/?(*.)+(spec).[jt]s?(x)'],
  coverageDirectory: '<rootDir>/coverage',
  collectCoverageFrom: [
    'src/**/*.ts',
    '!**/tests/**',
    '!src/server.ts',
    '!**/node_modules/**',
  ],
  testEnvironment: 'node',
  setupFiles: ['dotenv/config'],
  testTimeout: 100000,
  testResultsProcessor: 'jest-sonar-reporter',
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90
    }
  }
}
