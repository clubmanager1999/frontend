import { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { test, expect, vi } from 'vitest';

let mockResponse = {};

vi.mock('./auth/Auth', () => ({
  default: function Auth(props: { children: ReactNode }) {
    return <div>{props.children}</div>;
  },
}));

vi.mock('./profile/Profile', () => ({
  default: function Profile() {
    return <div>foo</div>;
  },
}));

vi.mock('react-oidc-context', () => ({
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

  const helloElement = screen.getByText(/foo/i);
  expect(helloElement).toBeInTheDocument();

  const logoutElement = screen.getAllByText(/Log out/i)[0];
  expect(logoutElement).toBeInTheDocument();
});
