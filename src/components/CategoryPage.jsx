import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';
import { products } from '../data/products';
import '../styles/CategoryPage.css';

function CategoryPage() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (!category) {
      navigate('/');
      return;
    }

    const filtered = products.filter(
      product => product.category.toLowerCase() === category.toLowerCase()
    );
    setFilteredProducts(filtered);
  }, [category, navigate]);

  const categories = ['Electronics', 'Clothing', 'Books'];
  const validCategory = categories.find(c => c.toLowerCase() === category?.toLowerCase());

  if (!validCategory) {
    return (
      <div className="category-page">
        <div className="invalid-category">
          <h2>Category Not Found</h2>
          <p>The category "{category}" doesn't exist.</p>
          <button onClick={() => navigate('/')} className="back-btn">
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="category-page">
      <div className="category-header">
        <button 
          onClick={() => navigate('/')} 
          className="back-btn"
          aria-label="Go back"
        >
          ← Back
        </button>
        <h1>{validCategory}</h1>
        <p className="category-count">
          {filteredProducts.length} item{filteredProducts.length !== 1 ? 's' : ''} in this category
        </p>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="category-products">
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
          <h3>No products in this category</h3>
          <p>Check back later for new items!</p>
        </div>
      )}

      <div className="category-navigation">
        <h3>Browse Other Categories</h3>
        <div className="category-links">
          {categories
            .filter(c => c.toLowerCase() !== category.toLowerCase())
            .map(c => (
              <button
                key={c}
                onClick={() => navigate(`/category/${c}`)}
                className="category-link"
              >
                {c}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;
