export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
  //   testMatch: ['**/__tests__/**/*.test.ts']
  testMatch: [
    '**/tests/**/*.test.ts',
    '**/tests/**/*.test.js',
    '**/tests/**/*.spec.ts',
    '**/tests/**/*.spec.js'
  ]
};
