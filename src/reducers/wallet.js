import { SET_CURRENCIES, ADD_EXPENSES,
  EXCHANGE_RATE, DELETE_EXPENSE } from '../actions/index';
// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  api: {},
  // totalExpenses: 0,
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SET_CURRENCIES:
    return {
      ...state, currencies: action.payload,
    };
  case EXCHANGE_RATE:
    return {
      ...state, api: action.payload,
    };
  case ADD_EXPENSES: {
    const { value, exchangeRates, currency } = action.payload;
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
      totalExpenses: state.totalExpenses + value * exchangeRates[currency].ask,
    };
  }
  case DELETE_EXPENSE: {
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.payload),
      // totalExpenses: state.totalExpenses - state.expenses[action.payload].value
      //   * state.expenses[action.payload]
      //     .exchangeRates[state.expenses[action.payload].currency].ask,
    };
  }
  default:
    return state;
  }
}

export default wallet;
