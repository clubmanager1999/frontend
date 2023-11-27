import React, { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

let mockResponse = {};

jest.mock(
  './auth/Auth',
  () =>
    function Auth(props: { children: ReactNode }) {
      return <div>{props.children}</div>;
    },
);

jest.mock('react-oidc-context', () => ({
  useAuth: () => mockResponse,
}));

test('renders logout', () => {
  mockResponse = {
    isAuthenticated: true,
    user: {
      profile: {
        preferred_username: 'foo',
      },
    },
  };

  render(<App />);

  const helloElement = screen.getByText(/Hello foo/i);
  expect(helloElement).toBeInTheDocument();

  const logoutElement = screen.getByText(/Log out/i);
  expect(logoutElement).toBeInTheDocument();
});
