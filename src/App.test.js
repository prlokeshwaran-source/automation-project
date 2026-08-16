import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the super admin login screen', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /super admin login/i })).toBeInTheDocument();
});
