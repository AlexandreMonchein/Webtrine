import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';
import FloatingSocials from '../floatingSocials.component';

// Mock des icônes
const MockIcon = ({ color }: { color?: string }) => (
  <svg data-testid="social-icon" data-color={color}>
    <rect width="24" height="24" />
  </svg>
);

// Mock du sélecteur Redux
const mockGetSocials = vi.fn();
vi.mock('../../../store/state.selector', () => ({
  getSocials: mockGetSocials,
}));

// Mock des imports dynamiques d'icônes
const mockIconImports = {
  '../../../assets/icons/facebook.component.tsx': () => Promise.resolve({ default: MockIcon }),
  '../../../assets/icons/instagram.component.tsx': () => Promise.resolve({ default: MockIcon }),
  '../../../assets/icons/twitter.component.tsx': () => Promise.resolve({ default: MockIcon }),
  '../../../assets/icons/linkedin.component.tsx': () => Promise.resolve({ default: MockIcon }),
};

Object.defineProperty(import.meta, 'glob', {
  value: vi.fn(() => mockIconImports),
  configurable: true,
});

const createStore = () => {
  return configureStore({
    reducer: {
      app: (state = {}, action) => state,
    },
  });
};

const renderWithProvider = () => {
  const store = createStore();
  return render(
    <Provider store={store}>
      <FloatingSocials />
    </Provider>
  );
};

describe('FloatingSocials Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
});