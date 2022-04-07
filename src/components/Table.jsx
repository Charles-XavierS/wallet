import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense } from '../actions';

import './Table.css';

class Table extends React.Component {
  render() {
    const { expenses, deleteExpenses } = this.props;
    return (

      <section>

        <table>

          <thead>

            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>

          </thead>

          <tbody>

            {expenses.map((expense) => (
              <tr key={ expense.id }>

                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{Number(expense.value).toFixed(2)}</td>
                <td>{expense.exchangeRates[expense.currency].name}</td>
                <td>
                  {Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}
                </td>
                <td>
                  { (expense.exchangeRates[expense.currency]
                    .ask * expense.value).toFixed(2) }
                </td>
                <td>Real</td>
                <td className="tableButtons">

                  <button
                    type="button"
                  >
                    Editar
                  </button>

                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => deleteExpenses(expense.id) }
                  >
                    Excluir
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  totalExpenses: state.wallet.totalExpenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpenses: (id) => dispatch(deleteExpense(id)),
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
  deleteExpenses: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
