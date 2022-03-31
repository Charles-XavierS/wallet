import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginEmail } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      disabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  validateForm = () => {
    const { email, password } = this.state;
    const minPassword = 6;
    this.setState({ disabled: true });
    if (email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) && password.length >= minPassword) {
      this.setState({ disabled: false });
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      this.validateForm();
    });
  }

  handleClick = () => {
    const { email } = this.state;
    const { history, emailLogin } = this.props;
    emailLogin(email);
    history.push('/carteira');
  }

  render() {
    const { email, password, disabled } = this.state;
    return (
      <div className="login">
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={ email }
          onChange={ this.handleChange }
          data-testid="email-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Senha"
          value={ password }
          onChange={ this.handleChange }
          data-testid="password-input"
        />
        <button
          type="button"
          onClick={ this.handleClick }
          disabled={ disabled }
          data-testid="edit-button-save"
        >
          Entrar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  emailLogin: (email) => dispatch(loginEmail(email)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  emailLogin: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
