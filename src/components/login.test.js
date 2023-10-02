import React from 'react';
import { render, screen } from '@testing-library/react';
import LoginDetails from './login';

describe('Login component', () => {
  test('renders email, password input fields', () => {
    render(<LoginDetails />);
    const emailInput = screen.getByPlaceholderText('Enter login ID');
    const passwordInput = screen.getByPlaceholderText('Password');
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });
});