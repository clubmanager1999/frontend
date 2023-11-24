import { render, screen } from '@testing-library/react';
import App from './App';

test('renders hi div element', () => {
  render(<App />);
  const linkElement = screen.getByText(/Hi/i);
  expect(linkElement).toBeInTheDocument();
});
