import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import '../styles/checkout.css';

class Checkout extends Component {
  render() {
    const { cartList } = this.props;

    return (
      <div className="checkout">
        <div className="checkout-header">
          <header>
            <div className="header-content">
              <h2 className="market">Undefined Shop</h2>
            </div>
          </header>
        </div>
        <Link className="back-link" to="/">
          <AiOutlineArrowLeft style={ { marginTop: 10 } } size={ 26 } color="#ff9000" />
        </Link>
        <div className="checkout-content">
          <h2 className="checkout-text">Revise seus produtos</h2>
          <div>
            <div className="checkout-content-list">
              {Object.keys(cartList).map((item, index) => (
                <div
                  key={ index }
                  className="checkout-list-products"
                >
                  <p className="checkout-title">
                    Produto:
                    {' '}
                    { cartList[item].title }
                  </p>
                  <img
                    className="checkout-img"
                    src={ cartList[item].thumbnail }
                    alt="foto do produto"
                  />
                  <p className="checkout-price">
                    Preço:
                    {' '}
                    {cartList[item].price }
                  </p>
                  <p className="checkout-quantity">
                    Quantidade:
                    {' '}
                    { cartList.length }
                  </p>
                </div>
              ))}
            </div>
          </div>
          <p className="checkout-total-price">
            Total: R$
            <span>
              { Object.keys(cartList)
                .reduce((acc, crr) => cartList.length * cartList[crr].price + acc, 0) }
            </span>
          </p>
        </div>
        <form className="checkout-form">
          <fieldset className="checkout-fieldset-user-info">
            <p className="user-info-text">
              Informações do comprador :
            </p>
            <div className="checkout-inputs">
              <input
                type="text"
                data-testid="checkout-fullname"
                placeholder="Nome completo"
              />
              <input
                type="email"
                data-testid="checkout-email"
                placeholder="E-mail"
              />
              <input
                type="text"
                data-testid="checkout-cpf"
                placeholder="CPF"
              />
              <input
                type="text"
                data-testid="checkout-phone"
                placeholder="Telefone"
              />
            </div>
            <div className="checkout-input-address">
              <input
                type="text"
                data-testid="checkout-cep"
                placeholder="CEP"
              />
              <input
                type="text"
                data-testid="checkout-address"
                placeholder="Endereço"
              />
            </div>
          </fieldset>
          <fieldset className="checkout-fieldset-payment">
            <p className="payment-method-text">
              Método de Pagamento:
            </p>
            <label className="label-payment-01" htmlFor="radio1">
              <input
                className="input-payment-01"
                type="radio"
                name="radio"
                id="radio1"
              />
              Boleto
            </label>
            <label className="label-payment-02" htmlFor="radio2">
              <input
                className="input-payment-02"
                type="radio"
                name="radio"
                id="radio2"
              />
              Cartão de Crédito
            </label>
            <label className="label-payment-03" htmlFor="radio3">
              <input
                className="input-payment-03"
                type="radio"
                name="radio"
                id="radio3"
              />
              Pix
            </label>
          </fieldset>
        </form>
        <button className="checkout-buy-btn" type="button">Comprar</button>
      </div>
    );
  }
}

Checkout.propTypes = {
  cartList: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
  length: PropTypes.number,
};

Checkout.defaultProps = {
  length: 0,
};

export default Checkout;
