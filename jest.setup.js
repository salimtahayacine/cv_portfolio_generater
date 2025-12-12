// Jest setup file

// Mock global Expo registry
global.__ExpoImportMetaRegistry = new Map();

// Mock expo modules
jest.mock('expo-image-picker', () => ({
  requestMediaLibraryPermissionsAsync: jest.fn(),
  launchImageLibraryAsync: jest.fn(),
  MediaTypeOptions: {
    Images: 'Images',
  },
}));

jest.mock('expo-sharing', () => ({
  isAvailableAsync: jest.fn(),
  shareAsync: jest.fn(),
}));

jest.mock('expo-print', () => ({
  printToFileAsync: jest.fn().mockResolvedValue({
    uri: 'file:///mock-pdf-path/output.pdf',
  }),
}));

jest.mock('expo-file-system', () => ({
  File: jest.fn().mockImplementation((path, fileName) => ({
    uri: `file://${path}/${fileName}`,
    write: jest.fn(),
  })),
  Paths: {
    document: '/documents',
  },
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  multiRemove: jest.fn(),
}));
