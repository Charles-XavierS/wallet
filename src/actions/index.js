// Coloque aqui suas actions
export const LOGIN_EMAIL = 'LOGIN_EMAIL';
export const SET_CURRENCIES = 'SET_CURRENCIES';

export const loginEmail = (email) => ({
  type: LOGIN_EMAIL,
  email,
});

export const setCurrencies = (currencies) => ({
  type: SET_CURRENCIES,
  currencies,
});

export const fetchApi = () => async (dispatch) => {
  const URL = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(URL);
  const data = await response.json();
  const filterCurrencies = Object.keys(data)
    .filter((coins) => coins !== 'USDT');
  dispatch(setCurrencies(filterCurrencies));
};
