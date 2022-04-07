// Coloque aqui suas actions
export const LOGIN_EMAIL = 'LOGIN_EMAIL';
export const SET_CURRENCIES = 'SET_CURRENCIES';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const EXCHANGE_RATE = 'EXCHANGE_RATE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const loginEmail = (email) => ({
  type: LOGIN_EMAIL,
  payload: email,
});

export const setCurrencies = (currencies) => ({
  type: SET_CURRENCIES,
  payload: currencies,
});

export const addExpenses = (expenses) => ({
  type: ADD_EXPENSES,
  payload: expenses,
});

export const deleteExpense = (expenseId) => ({
  type: 'DELETE_EXPENSE',
  payload: expenseId,
});

export const exchanges = (api) => ({
  type: EXCHANGE_RATE,
  payload: api,
});

export const fetchApi = () => async (dispatch) => {
  const URL = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(URL);
  const data = await response.json();
  const filterCurrencies = Object.keys(data)
    .filter((coins) => coins !== 'USDT');
  dispatch(setCurrencies(filterCurrencies));
};

export const fetchExchange = () => async (dispatch) => {
  const URL = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(URL);
  const data = await response.json();
  delete data.USDT;
  dispatch(exchanges(data));
};
