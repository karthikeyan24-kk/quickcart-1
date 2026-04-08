import { useState } from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import CartSidebar from './components/CartSidebar';
import { products } from './data/products';
import './styles/App.css';

function App() {
  // TODO: Add state for cart items (array)
  // Hint: const [cart, setCart] = useState([]);
  const [cart,setCart] = useState([])  
  // TODO: Add state for cart visibility (boolean)
  // Hint: const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  // TODO: Create addToCart function
  const addToCart = (product) => {
    // Implementation for adding item to cart
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // This function should:
  // 1. Check if item already exists in cart
  // 2. If yes, increase quantity
  // 3. If no, add new item with quantity 1
  
  // TODO: Create removeFromCart function
  // This function should filter out the item by id
  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };
  
  // TODO: Create updateQuantity function
  // This function should update the quantity of a specific item
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      ));
    }
  };
  
  // TODO: Create toggleCart function
  // This function should toggle isCartOpen between true/false
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  // Helper function to calculate total items in cart
  const calculateTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="app">
      <Header 
        cartCount={calculateTotalItems()} 
        onToggleCart={toggleCart}
        isCartOpen={isCartOpen}
      />
      <CartSidebar
        isOpen={isCartOpen}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onToggleCart={toggleCart}
      />
      <main className="main-content">
        <ProductList 
          products={products}
          onAddToCart={addToCart}
        />
      </main>
    </div>
  );
}

export default App;