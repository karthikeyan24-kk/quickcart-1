import React from 'react';
import { useCart } from '../hooks/useCart';
import '../styles/CartSidebar.css';

function CartSidebar() {
  const { 
    isCartOpen, 
    cart, 
    updateQuantity, 
    removeFromCart, 
    toggleCart, 
    calculateTotalPrice 
  } = useCart();

  return (
    <>
      {/* Overlay backdrop */}
      {isCartOpen && (
        <div className="cart-overlay" onClick={toggleCart}></div>
      )}
      
      {/* Sidebar panel */}
      <div className={`cart-sidebar ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>Shopping Cart</h2>
          <button 
            className="cart-close-btn"
            onClick={toggleCart}
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        <div className="cart-items-container">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty</p>
              <p className="empty-cart-subtitle">Add items to get started!</p>
            </div>
          ) : (
            <div className="cart-items">
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="cart-item-image"
                  />
                  
                  <div className="cart-item-details">
                    <h4 className="cart-item-name">{item.name}</h4>
                    <p className="cart-item-price">${item.price}</p>
                    
                    <div className="quantity-controls">
                      <button
                        className="qty-btn"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button
                        className="qty-btn"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    
                    <p className="cart-item-subtotal">
                      Subtotal: ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                    aria-label={`Remove ${item.name}`}
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <strong>Total: ${calculateTotalPrice().toFixed(2)}</strong>
            </div>
            <button className="checkout-btn">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default CartSidebar;
