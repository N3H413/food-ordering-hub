import { useState, useEffect } from 'react';
import MenuGrid from './components/MenuGrid';
import CartSidebar from './components/CartSidebar';

const FOOD_MENU = [
  // Pizzas
  { id: 1, name: 'Pepperoni Pizza', price: 12.99, category: 'Pizzas', isVeg: false, image: '/images/pepperoni-pizza.jpg' },
  { id: 2, name: 'Margherita Pizza', price: 10.49, category: 'Pizzas', isVeg: true, image: '/images/margherita-pizza.jpg' },
  { id: 3, name: 'Spicy BBQ Chicken Pizza', price: 13.99, category: 'Pizzas', isVeg: false, image: '/images/chicken-pizza.jpg' },
  
  // Burgers
  { id: 4, name: 'Classic Cheeseburger', price: 8.49, category: 'Burgers', isVeg: false, image: '/images/cheeseburger.jpg' },
  { id: 5, name: 'Crispy Chicken Burger', price: 9.29, category: 'Burgers', isVeg: false, image: '/images/chicken-burger.jpg' },
  { id: 6, name: 'Spicy Black Bean Burger', price: 7.99, category: 'Burgers', isVeg: true, image: '/images/bean-burger.jpg' },
  
  // Sides & Salads
  { id: 7, name: 'Crispy French Fries', price: 3.99, category: 'Sides', isVeg: true, image: '/images/french-fries.jpg' },
  { id: 8, name: 'Veggie Caesar Salad', price: 7.99, category: 'Sides', isVeg: true, image: '/images/caesar-salad.jpg' },
  
  // Drinks
  { id: 9, name: 'Chocolate Milkshake', price: 4.49, category: 'Drinks', isVeg: true, image: '/images/milkshake.jpg' },
  { id: 10, name: 'Iced Lemon Tea', price: 2.99, category: 'Drinks', isVeg: true, image: '/images/iced-tea.jpg' }
];

export default function App() {
  const [cart, setCart] = useState(()=> {
    const savedCart= localStorage.getItem('foodHubCart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(()=> {
    localStorage.setItem('foodHubCart', JSON.stringify(cart));
  }, [cart]);

  const handleAddToCart = (selectedItem) => {
    setCart((currentCart) => {
      const isItemInCart = currentCart.find((cartItem) => cartItem.id === selectedItem.id);

      if (isItemInCart) {
        return currentCart.map((cartItem) =>
          cartItem.id === selectedItem.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }

      return [...currentCart, { ...selectedItem, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (itemId) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find((cartItem)=> cartItem.id === itemId);
      if(!existingItem) return currentCart;
      if(existingItem.quantity > 1) {
        return currentCart.map((cartItem) => cartItem.id === itemId 
        ? { ...cartItem, quantity: cartItem.quantity -1} 
        : cartItem
        );
      }
      return currentCart.filter((cartItem) => cartItem.id !== itemId);
    });
  };

  const totalItemsCount = cart.reduce((total, cartItem) => total + cartItem.quantity, 0);
  const totalOrderPrice = cart.reduce((total, cartItem) => total + (cartItem.price * cartItem.quantity), 0);

  const handleClearCart = () =>{
    if(window.confirm("Completely clear order?")){
      setCart([]);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans antialiased">
      
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent">
          FoodHub.
        </h1>
        <div className="bg-orange-50 border border-orange-100 text-orange-700 font-semibold px-4 py-2 rounded-full text-sm flex items-center gap-2">
          <span>Cart Items:</span>
          <span className="bg-orange-600 text-white text-xs px-2 py-0.5 rounded-full font-bold">
            {totalItemsCount}
          </span>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6 flex flex-col lg:flex-row gap-8">
        
        <main className="flex-1">
          <MenuGrid menuItems={FOOD_MENU} onAddToCart={handleAddToCart} />
        </main>
        <aside className="w-full lg:w-80 bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 h-fit lg:sticky lg:top-24">
          <CartSidebar 
            cart={cart} 
            totalPrice={totalOrderPrice} 
            onRemoveFromCart={handleRemoveFromCart}
            onIncrementFromCart={handleAddToCart}
            onClearCart={handleClearCart}
            />
        </aside>

      </div>
    </div>
  );
}