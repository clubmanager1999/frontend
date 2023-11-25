import { render, screen } from '@testing-library/react';
import App from './App';

var mockResponse = {};

jest.mock('react-oidc-context', () => ({
  useAuth: () => mockResponse,
}));

test('renders login', () => {
  mockResponse = {};

  render(<App />);
  const element = screen.getByText(/Log in/i);
  expect(element).toBeInTheDocument();
});

test('renders signing in', () => {
  mockResponse = {
    activeNavigator: 'signinSilent',
  };

  render(<App />);
  const element = screen.getByText(/Signing in.../i);
  expect(element).toBeInTheDocument();
});

test('renders loading', () => {
  mockResponse = {
    isLoading: true,
  };

  render(<App />);
  const element = screen.getByText(/Loading.../i);
  expect(element).toBeInTheDocument();
});

test('renders error', () => {
  mockResponse = {
    error: {
      message: 'foo',
    },
  };

  render(<App />);
  const element = screen.getByText(/Failed to login: foo/i);
  expect(element).toBeInTheDocument();
});

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

test('renders signing out', () => {
  mockResponse = {
    activeNavigator: 'signoutRedirect',
  };

  render(<App />);
  const element = screen.getByText(/Signing out.../i);
  expect(element).toBeInTheDocument();
});
