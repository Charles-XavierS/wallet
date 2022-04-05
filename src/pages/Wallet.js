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
      expenses: 0,
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
    const { addExpenses, api, expenses } = this.props;

    const newExpense = {
      id: expenses.length,
      value,
      currency,
      method,
      tag,
      description,
      exchangeRates: { ...api },
    };

    addExpenses(newExpense);
    this.clearForm();
  }

  render() {
    const { email, currencies } = this.props;
    const { value, currency, method,
      tag, description } = this.state;
    const methodsInput = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const categoriesInput = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <main>

        <header>

          <p data-testid="email-field">{ email }</p>
          <p data-testid="total-field">Total: R$ { 0 }</p>
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
             {currencies.map(key => (
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
              {methodsInput.map((method) => <option key={ method }>{method}</option>)}
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
              {categoriesInput
                .map((categorie) =>
                <option key={ categorie }>
                  {categorie}
                  </option>)}
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
  addExpenses: (expenses) => dispatch(addExpenses(expenses)),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  coinsFromApi: PropTypes.func.isRequired,
  addExpenses: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
