import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchApi } from '../actions';
import './wallet.css';

class Wallet extends React.Component {
  componentDidMount() {
    const { coinsFromApi } = this.props;
    coinsFromApi();
  }

  render() {
    const { email } = this.props;
    return (
      <header>

        <p data-testid="email-field">{ email }</p>
        <p data-testid="total-field">Total: R$ 0</p>
        <p data-testid="header-currency-field">BRL</p>

      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  coinsFromApi: () => dispatch(fetchApi()),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  coinsFromApi: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
