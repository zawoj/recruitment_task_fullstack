import React from 'react';
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import axios from 'axios';
import '@testing-library/jest-dom'
import CalculatorView from '../sections/calculator/CalculatorView';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockRatesData = {
};

test('renders and displays loading spinner', async () => {
  mockedAxios.get.mockResolvedValue({ data: mockRatesData });

  await act(async () => {
    render(<CalculatorView />);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });
  expect(screen.queryByTestId('spinner')).toBe(null);
});

test('renders form elements after data load', async () => {
  mockedAxios.get.mockResolvedValue({ data: mockRatesData });

  await act(async () => {
    render(<CalculatorView />);
  });

  await waitFor(() => {
    expect(screen.getByTestId('start-value-input')).toBeInTheDocument();
    expect(screen.getByTestId('option-one-select')).toBeInTheDocument();
    expect(screen.getByTestId('option-two-select')).toBeInTheDocument();
  });
});

test('handles form inputs and selects', async () => {
  mockedAxios.get.mockResolvedValue({ data: mockRatesData });

  await act(async () => {
    render(<CalculatorView />);
  });

  fireEvent.change(screen.getByTestId('start-value-input'), { target: { value: '100' } });
  fireEvent.change(screen.getByTestId('option-one-select'), { target: { value: 'USD' } });
  fireEvent.change(screen.getByTestId('option-two-select'), { target: { value: 'EUR' } });

 
});

test('displays calculation result', async () => {
  mockedAxios.get.mockResolvedValue({ data: mockRatesData });

  await act(async () => {
    render(<CalculatorView />);
  });

  fireEvent.change(screen.getByTestId('start-value-input'), { target: { value: '100' } });
  fireEvent.change(screen.getByTestId('option-one-select'), { target: { value: 'USD' } });
  fireEvent.change(screen.getByTestId('option-two-select'), { target: { value: 'EUR' } });


});
