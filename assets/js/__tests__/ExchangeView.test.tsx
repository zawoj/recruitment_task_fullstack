import React, { InputHTMLAttributes, ReactElement } from 'react';
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import axios from 'axios';
import ExchangeView from '../sections/exchange/ExchangeView';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import '@testing-library/jest-dom'

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;
 const mockData = {
        data: {
        rates: [{ code: 'USD', currency: 'US Dollar', mid: 3.5 }],
        effectiveDate: '2023-01-01',
        }
};

const history = createMemoryHistory();

const renderWithRouter = (component: ReactElement) => {
  return {
    ...render(
      <Router history={history}>
        {component}
      </Router>
    ),
  };
};



test('renders and displays loading spinner', async () => {
    mockedAxios.get.mockResolvedValue(mockData);

    await act(async () => {
        renderWithRouter(<ExchangeView />);
        expect(screen.getByTestId('spinner')).toBeInTheDocument();
    });
    expect(screen.queryByTestId('spinner')).toBe(null)
});



test('renders exchange rate data after successful fetch', async () => {
  mockedAxios.get.mockResolvedValue(mockData);
  
  await act(async () => {
    renderWithRouter(<ExchangeView />);
  });

  await waitFor(() => {
    expect(screen.getByText('USD - US Dollar')).toBeInTheDocument();
  });
});


test('displays error message on fetch failure', async () => {
  mockedAxios.get.mockRejectedValue({
    response: { data: { error: 'Fetch error' } }
  });

  await act(async () => {
    renderWithRouter(<ExchangeView />);
  });

  await waitFor(() => {
    expect(screen.getByText(/fetch error/i)).toBeInTheDocument();
  });
});


test('updates date on date input change', async () => {
  await act(async () => {
    renderWithRouter(<ExchangeView />);
  });

  // Oczekuj, aż spinner zniknie
  await waitFor(() => {
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  });

  await act(async () => {
    const dateInput = screen.getByTestId('date-input');
    fireEvent.change(dateInput, { target: { value: '2023-01-02' } });
  });

  expect((screen.getByTestId('date-input') as HTMLInputElement).value).toBe('2023-01-02');
});
