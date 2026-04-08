import React from 'react';
import '../styles/Header.css';

function Header({ cartCount = 0, onToggleCart, isCartOpen }) {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          <h1 className="header-title">🛒 QuickCart</h1>
          <p className="header-subtitle">Your one-stop shop for everything</p>
        </div>
        <button 
          className="cart-button"
          onClick={onToggleCart}
          aria-label="Toggle cart"
        >
          🛒 Cart ({cartCount})
        </button>
      </div>
    </header>
  );
}

export default Header;