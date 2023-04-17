import React, { useContext } from 'react';
import { v4 as uuid } from 'uuid';
import PagoShopContext from '../context/PagoShopContext';
import formatNumberToPrice from '../helpers/formatNumber';
import './styles/PreviewCartModal.css';

function PreviewCartModal() {
  const {
    showPreviewCartModel,
    setShowPreviewCartModel,
    cart,
    totalPrice,
  } = useContext(PagoShopContext);

  const handlePreviewCartCloseClick = () => setShowPreviewCartModel(false);

  if (showPreviewCartModel) {
    return (
      <section className="preview-card-modal">
        <div className="modal-header">
          <button
            type="button"
            onClick={handlePreviewCartCloseClick}
          >
            <span className="material-icons-outlined">keyboard_arrow_right</span>
          </button>
          <span>Carrinho</span>
        </div>
        <div className="modal-products">
          {cart && cart.map((prod) => {
            const {
              name,
              thumbnail,
              price,
              quantity,
            } = prod;

            return (
              <>
                <div className="modal-products-item" key={uuid()}>
                  <img src={thumbnail} alt={name} />
                  <div className="item-infos">
                    <span>{name}</span>
                    <span className="item-price">{`R$ ${formatNumberToPrice(price)}`}</span>
                    <div className="info-quantity-control">
                      <button type="button">-</button>
                      <span>{quantity}</span>
                      <button type="button">+</button>
                    </div>
                  </div>
                </div>
                <div className="divisor" />
              </>
            );
          })}
        </div>
        <div className="modal-price">
          <span>Subtotal</span>
          <span>{`R$ ${totalPrice()}`}</span>
        </div>
        <div className="divisor" />
        <button className="cart-details-button" type="button">Ver carrinho</button>
      </section>
    );
  }
}

export default PreviewCartModal;