import React, { InputHTMLAttributes, ReactElement } from 'react';
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import axios from 'axios';
import ExchangeView from '../sections/exchange/ExchangeView';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import '@testing-library/jest-dom'
import EchangeHistoryView from '../sections/exchange/EchangeHistoryView';

jest.mock('axios');
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
  useLocation: () => ({
    search: '?code=USD&startDate=2023-01-01&endDate=2023-01-07',
  }),
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockData = {
    "table": "A",
    "currency": "euro",
    "code": "EUR",
    "rates": [
        {
            "no": "225\/A\/NBP\/2023",
            "effectiveDate": "2023-11-21",
            "mid": 4.3647
        },
        {
            "no": "226\/A\/NBP\/2023",
            "effectiveDate": "2023-11-22",
            "mid": 4.3804
        },
        {
            "no": "227\/A\/NBP\/2023",
            "effectiveDate": "2023-11-23",
            "mid": 4.3658
        },
        {
            "no": "228\/A\/NBP\/2023",
            "effectiveDate": "2023-11-24",
            "mid": 4.3722
        },
        {
            "no": "229\/A\/NBP\/2023",
            "effectiveDate": "2023-11-27",
            "mid": 4.3543
        }
    ]
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
  mockedAxios.get.mockResolvedValue({
    data: mockData
  });

  await act(async () => {
    render(<EchangeHistoryView />);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });
  expect(screen.queryByTestId('spinner')).toBe(null)

});


test('renders exchange rate data after successful fetch', async () => {

  mockedAxios.get.mockResolvedValue({ data: mockData });

  await act(async () => {
    render(<EchangeHistoryView />);
  });

  await waitFor(() => {
    expect(screen.getByText(/Exchange Rates History/)).toBeInTheDocument();
    // Możesz dodać inne asercje dla danych historycznych
  });
});


test('displays error message on fetch failure', async () => {
  mockedAxios.get.mockRejectedValue({
    response: { data: { error: 'Fetch error' } }
  });

  await act(async () => {
    render(<EchangeHistoryView />);
  });

  await waitFor(() => {
    expect(screen.getByText(/fetch error/i)).toBeInTheDocument();
  });
});



test('updates start and end dates on input change', async () => {
  mockedAxios.get.mockResolvedValue({ data: mockData });

  await act(async () => {
    render(<EchangeHistoryView />);
  });

  const startDateInput:HTMLInputElement = screen.getByTestId('start-date-input');
  const endDateInput:HTMLInputElement = screen.getByTestId('end-date-input');

  fireEvent.change(startDateInput, { target: { value: '2023-01-02' } });
  fireEvent.change(endDateInput, { target: { value: '2023-01-08' } });

  expect(startDateInput.value).toBe('2023-01-02');
  expect(endDateInput.value).toBe('2023-01-08');
});

