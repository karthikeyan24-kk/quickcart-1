import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';
import { products } from '../data/products';
import '../styles/HomePage.css';

function HomePage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm]);

  return (
    <div className="home-page">
      <div className="search-section">
        <h2>Find Your Favorite Products</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button
              className="clear-search"
              onClick={() => setSearchTerm('')}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
        <p className="search-results-count">
          {filteredProducts.length > 0 
            ? `${filteredProducts.length} product${filteredProducts.length !== 1 ? 's' : ''} found`
            : 'No products found'}
        </p>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="home-products">
          <div className="product-grid">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="empty-state">
          <h3>No products found</h3>
          <p>Try adjusting your search term or browse by category</p>
          <div className="category-links">
            <button onClick={() => navigate('/category/Electronics')} className="category-link">
              Electronics
            </button>
            <button onClick={() => navigate('/category/Clothing')} className="category-link">
              Clothing
            </button>
            <button onClick={() => navigate('/category/Books')} className="category-link">
              Books
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
