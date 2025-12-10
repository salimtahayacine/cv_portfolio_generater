module.exports = {
  preset: 'jest-expo',
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|@reduxjs/.*|immer)',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.types.ts',
    '!src/**/index.ts',
  ],
  testMatch: [
    '**/__tests__/**/*.test.{ts,tsx}',
  ],
  moduleNameMapper: {
    '^expo$': '<rootDir>/node_modules/expo/src/index.ts',
  },
};
