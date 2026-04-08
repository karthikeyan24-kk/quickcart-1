import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import '../styles/CartPage.css';

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, calculateTotalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-header">
          <button onClick={() => navigate('/')} className="back-btn">
            ← Continue Shopping
          </button>
          <h1>Shopping Cart</h1>
        </div>

        <div className="empty-cart-page">
          <div className="empty-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Start shopping and add items to your cart!</p>
          <button onClick={() => navigate('/')} className="shop-btn">
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <button onClick={() => navigate('/')} className="back-btn">
          ← Continue Shopping
        </button>
        <h1>Shopping Cart</h1>
      </div>

      <div className="cart-container">
        <div className="cart-items-section">
          <h2>Cart Items ({cart.length})</h2>
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.id} className="cart-page-item">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="item-image"
                />

                <div className="item-details">
                  <h3 className="item-name">{item.name}</h3>
                  <p className="item-category">{item.category}</p>
                  <p className="item-price">${item.price}</p>
                </div>

                <div className="item-controls">
                  <div className="quantity-section">
                    <label htmlFor={`qty-${item.id}`}>Quantity:</label>
                    <div className="quantity-controls">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="qty-btn"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <input
                        id={`qty-${item.id}`}
                        type="number"
                        min="1"
                        max="999"
                        value={item.quantity}
                        onChange={(e) => {
                          const val = parseInt(e.target.value) || 1;
                          updateQuantity(item.id, val);
                        }}
                        className="qty-input"
                      />
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="qty-btn"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="subtotal">
                    <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="remove-btn"
                    aria-label={`Remove ${item.name}`}
                  >
                    🗑️ Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-details">
            <div className="summary-row">
              <span>Subtotal:</span>
              <strong>${calculateTotalPrice().toFixed(2)}</strong>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <strong>Free</strong>
            </div>
            <div className="summary-row">
              <span>Tax:</span>
              <strong>$0.00</strong>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-row total">
              <span>Total:</span>
              <strong>${calculateTotalPrice().toFixed(2)}</strong>
            </div>
          </div>

          <button className="checkout-btn">
            Proceed to Checkout
          </button>

          <button 
            onClick={() => navigate('/')} 
            className="continue-shopping-btn"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
