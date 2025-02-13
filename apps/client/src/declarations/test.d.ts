import { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';

import 'vitest';

// ugly hack because vite and pnpm are not playing ball with jest
// https://github.com/testing-library/jest-dom/issues/123
declare global {
  namespace Vi {
    interface Assertion<T = any> extends TestingLibraryMatchers<T, void> {}
  }
}
