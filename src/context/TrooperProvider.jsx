import React, { useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TrooperContext from './TrooperContext';
import requester from '../helpers/requester';
import formatNumberToPrice from '../helpers/formatNumber';

function TrooperProvider({ children }) {
  const [loadLevel, setLoadLevel] = useState('0%');
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [categories, setCategories] = useState();
  const [filterCategory, setFilterCategory] = useState('');
  const [orderId, setOrderId] = useState(0);
  const [cart, setCart] = useState([]);
  const [showPreviewCartModal, setShowPreviewCartModal] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  const requestProducts = async () => {
    const productsResponse = await requester('products', 'get');
    return productsResponse;
  };

  const requestCategories = async () => {
    const categoriesResponse = await requester('categories', 'get');
    const firstCategories = categoriesResponse.slice(0, 6);

    setCategories(firstCategories);
  };

  const requestHealthChecks = async () => {
    if (process.env.REACT_APP_ENVIRONMENT === 'prod') {
      const responseGateway = await requester('health', 'gateway');
      if (responseGateway === 'OK!') setLoadLevel('20%');

      const responseAccount = await requester('health', 'account');
      if (responseAccount === 'OK!') setLoadLevel('40%');

      const responseProduct = await requester('health', 'product');
      if (responseProduct === 'OK!') setLoadLevel('60%');

      const responseOrder = await requester('health', 'order');
      if (responseOrder === 'OK!') setLoadLevel('80%');

      const responsePayment = await requester('health', 'payment');
      if (responsePayment === 'OK!') setLoadLevel('100%');
    }

    setLoading(false);
  };

  useEffect(() => {
    requestHealthChecks();
  }, []);

  useEffect(() => {
    requestCategories();
  }, []);

  useEffect(() => {
    const recoverPreviousCart = localStorage.getItem('shopping-cart');
    if (cart.length === 0 && recoverPreviousCart) {
      setCart(JSON.parse(recoverPreviousCart));
    }
  }, []);

  useEffect(() => {
    const newCart = cart;
    const someItemZero = newCart.some((prod) => prod.quantity === 0);
    const cartWithoutZero = newCart.filter((prod) => prod.quantity !== 0);

    if (someItemZero) {
      setCart([...cartWithoutZero]);
    }

    localStorage.setItem('shopping-cart', JSON.stringify(cart));
  }, [cart]);

  const totalPrice = () => {
    const pricesInCart = cart.map((prod) => prod.price * prod.quantity);
    const totalPriceInCart = pricesInCart.reduce((prev, crr) => prev + crr, 0);
    const priceFormated = formatNumberToPrice.format(totalPriceInCart);

    return priceFormated;
  };

  const value = useMemo(() => ({
    totalPrice,
    requestProducts,
    query,
    setQuery,
    filterCategory,
    setFilterCategory,
    cart,
    setCart,
    orderId,
    setOrderId,
    categories,
    setCategories,
    showPreviewCartModal,
    setShowPreviewCartModal,
    showCheckoutModal,
    setShowCheckoutModal,
    loadLevel,
    setLoadLevel,
    loading,
    setLoading,
  }), [
    cart,
    query,
    filterCategory,
    orderId,
    categories,
    showPreviewCartModal,
    showCheckoutModal,
    loadLevel,
    loading,
  ]);

  return (
    <TrooperContext.Provider value={value}>
      {children}
    </TrooperContext.Provider>
  );
}

TrooperProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TrooperProvider;
