import React from 'react';
import { render, screen } from '@testing-library/react';
import Auth from './Auth';

let mockResponse = {};

jest.mock('react-oidc-context', () => ({
  useAuth: () => mockResponse,
}));

test('renders login', () => {
  const signinRedirect = jest.fn();

  mockResponse = {
    signinRedirect,
  };

  render(<Auth />);

  const element = screen.getByText(/Redirecting.../i);
  expect(element).toBeInTheDocument();

  expect(signinRedirect).toHaveBeenCalled();
});

test('renders signing in', () => {
  mockResponse = {
    activeNavigator: 'signinSilent',
  };

  render(<Auth />);
  const element = screen.getByText(/Signing in.../i);
  expect(element).toBeInTheDocument();
});

test('renders loading', () => {
  mockResponse = {
    isLoading: true,
  };

  render(<Auth />);
  const element = screen.getByText(/Loading.../i);
  expect(element).toBeInTheDocument();
});

test('renders error', () => {
  mockResponse = {
    error: {
      message: 'foo',
    },
  };

  render(<Auth />);
  const element = screen.getByText(/Failed to login: foo/i);
  expect(element).toBeInTheDocument();
});

test('renders children', () => {
  mockResponse = {
    isAuthenticated: true,
  };

  render(<Auth>Hello foo</Auth>);

  const helloElement = screen.getByText(/Hello foo/i);
  expect(helloElement).toBeInTheDocument();
});

test('renders signing out', () => {
  mockResponse = {
    activeNavigator: 'signoutRedirect',
  };

  render(<Auth />);
  const element = screen.getByText(/Signing out.../i);
  expect(element).toBeInTheDocument();
});
