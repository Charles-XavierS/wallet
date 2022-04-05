import { SET_CURRENCIES, ADD_EXPENSES, EXCHANGE_RATE } from '../actions/index';
// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  api: [],
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
  case ADD_EXPENSES:
    return {
      ...state, expenses: [...state.expenses, action.expenses],
    };
  default:
    return state;
  }
}

export default wallet;
