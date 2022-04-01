import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchApi } from '../actions';
import './wallet.css';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
    };
  }

  componentDidMount() {
    const { coinsFromApi } = this.props;
    coinsFromApi();
  }

  render() {
    const { email, currencies } = this.props;
    const methodsInput = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const categoriesInput = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <main>

        <header>

          <p data-testid="email-field">{ email }</p>
          <p data-testid="total-field">Total: R$ 0</p>
          <p data-testid="header-currency-field">BRL</p>

        </header>

        <section>

          <label htmlFor="despesa">
            Valor:
            <input
              type="number"
              name="despesa"
              placeholder="Digite um valor"
              data-testid="value-input"
            />
          </label>

          <label htmlFor="moeda">
            Moeda:
            <select
              name="moeda"
              id="moeda"
            >
              {currencies.map((currency) => <option key={ currency }>{currency}</option>)}
            </select>
          </label>

          <label htmlFor="pagamento">
            Método de pagamento:
            <select
              name="pagamento"
              id="pagamento"
              data-testid="method-input"
            >
              {methodsInput.map((method) => <option key={ method }>{method}</option>)}
            </select>
          </label>

          <label htmlFor="categorias">
            Categoria:
            <select
              name="categorias"
              id="categorias"
              data-testid="tag-input"
            >
              {categoriesInput
                .map((categorie) => <option key={ categorie }>{categorie}</option>)}
            </select>
          </label>

          <label htmlFor="descrição">
            Descrição:
            <input
              type="text"
              name="descrição"
              placeholder="Descrição da despesa"
              data-testid="description-input"
            />
          </label>

        </section>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  coinsFromApi: () => dispatch(fetchApi()),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  coinsFromApi: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
