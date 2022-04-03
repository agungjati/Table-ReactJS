import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import App from './App';

test('renders Data Table header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Data Table/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders get row data', () => {
  render(<App />);
  const row = screen.getByRole('row')
  expect(row).toBeInTheDocument();
});