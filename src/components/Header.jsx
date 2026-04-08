import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import '../styles/Header.css';

function Header() {
  const navigate = useNavigate();
  const { calculateTotalItems, toggleCart } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [showNav, setShowNav] = useState(false);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
  };

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      navigate(`/?search=${encodeURIComponent(searchTerm)}`);
      setSearchTerm('');
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <button 
            className="menu-toggle"
            onClick={() => setShowNav(!showNav)}
            aria-label="Toggle navigation"
          >
            ☰
          </button>
          <Link to="/" className="header-logo">
            <h1 className="header-title">🛒 QuickCart</h1>
          </Link>
        </div>

        <div className={`header-nav ${showNav ? 'active' : ''}`}>
          <Link to="/" className="nav-link" onClick={() => setShowNav(false)}>
            Home
          </Link>
          <div className="nav-categories">
            <span className="nav-label">Categories</span>
            <div className="category-dropdown">
              <Link to="/category/Electronics" className="dropdown-link">
                Electronics
              </Link>
              <Link to="/category/Clothing" className="dropdown-link">
                Clothing
              </Link>
              <Link to="/category/Books" className="dropdown-link">
                Books
              </Link>
            </div>
          </div>
          <Link to="/cart" className="nav-link" onClick={() => setShowNav(false)}>
            View Cart
          </Link>
        </div>

        <div className="header-search">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearch}
            onKeyPress={handleSearchSubmit}
            className="search-input-header"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="clear-btn"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        <button 
          className="cart-button"
          onClick={toggleCart}
          aria-label="Toggle cart"
        >
          🛒 Cart ({calculateTotalItems()})
        </button>
      </div>
    </header>
  );
}

export default Header;
