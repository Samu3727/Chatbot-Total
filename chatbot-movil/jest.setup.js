/* eslint-disable no-undef */
import 'react-native-gesture-handler/jestSetup';

// Mock de @react-navigation
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: jest.fn(),
      goBack: jest.fn(),
    }),
    useRoute: () => ({
      params: {},
    }),
  };
});

// Mock de expo modules
jest.mock('expo-constants', () => ({
  default: {
    manifest: {},
  },
}));

jest.mock('expo-linking', () => ({
  createURL: jest.fn(),
}));

// Suprimir warnings específicos
const originalConsoleWarn = console.warn;
console.warn = (...args) => {
  if (
    typeof args[0] === 'string' &&
    args[0].includes('ViewPropTypes will be removed')
  ) {
    return;
  }
  originalConsoleWarn(...args);
};

// Mock de fetch global
global.fetch = jest.fn();
