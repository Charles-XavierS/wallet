import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchApi, addExpenses, fetchExchange } from '../actions';
import Table from '../components/Table';
import './wallet.css';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { coinsFromApi, exchangeRates } = this.props;
    coinsFromApi();
    exchangeRates();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  clearForm() {
    this.setState({
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      description: '',
    });
  }

  handleClick() {
    const { value, currency, method, tag, description } = this.state;
    const { addExpense, api, expenses } = this.props;

    const newExpense = {
      id: expenses.length,
      value,
      currency,
      method,
      tag,
      description,
      exchangeRates: { ...api },
    };

    addExpense(newExpense);
    this.clearForm();
  }

  render() {
    const { email, currencies } = this.props;
    const { value, currency, method,
      tag, description } = this.state;
    const methodsInput = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const total = 0;
    return (
      <main>

        <header>

          <p data-testid="email-field">{ email }</p>
          <p data-testid="total-field">
            Total: R$
            { total }
          </p>
          <p data-testid="header-currency-field">BRL</p>

        </header>

        <section>

          <label htmlFor="value">
            Valor:
            <input
              type="number"
              name="value"
              placeholder="Digite um valor"
              data-testid="value-input"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="currency">
            Moeda:
            <select
              name="currency"
              id="currency"
              value={ currency }
              onChange={ this.handleChange }
            >
              {currencies.map((key) => (
                <option key={ key } value={ key }>{ key }</option>
              ))}
            </select>
          </label>

          <label htmlFor="method">
            Método de pagamento:
            <select
              name="method"
              id="method"
              data-testid="method-input"
              value={ method }
              onChange={ this.handleChange }
            >
              {methodsInput.map((methods) => <option key={ methods }>{methods}</option>)}
            </select>
          </label>

          <label htmlFor="tag">
            Categoria:
            <select
              name="tag"
              id="tag"
              data-testid="tag-input"
              value={ tag }
              onChange={ this.handleChange }
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>

          <label htmlFor="description">
            Descrição:
            <input
              type="text"
              name="description"
              placeholder="Descrição da despesa"
              data-testid="description-input"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>

          <button
            type="button"
            onClick={ this.handleClick }
          >
            Adicionar despesa
          </button>

        </section>

        <Table />

      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  api: state.wallet.api,
});

const mapDispatchToProps = (dispatch) => ({
  coinsFromApi: () => dispatch(fetchApi()),
  exchangeRates: () => dispatch(fetchExchange()),
  addExpense: (expenses) => dispatch(addExpenses(expenses)),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  coinsFromApi: PropTypes.func.isRequired,
  addExpense: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  exchangeRates: PropTypes.func.isRequired,
  api: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
