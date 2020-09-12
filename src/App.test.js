import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders ef copyright', () => {
  const { getByText } = render(<App />);
  const copyright = getByText(
    /Copyright © Eclipse Foundation, Inc. All Rights Reserved./i
  );
  expect(copyright).toBeInTheDocument();
});
