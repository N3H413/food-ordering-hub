import { useState } from 'react';
import MenuGrid from './components/MenuGrid';
import CartSidebar from './components/CartSidebar';

const FOOD_MENU = [
  { id: 1, name: 'Pepperoni Pizza', price: 12.99, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&q=80' },
  { id: 2, name: 'Cheeseburger', price: 8.49, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80' },
  { id: 3, name: 'Crispy French Fries', price: 3.99, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=500&q=80' },
  { id: 4, name: 'Veggie Caesar Salad', price: 7.99, image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=500&q=80' },
];

export default function App() {
  const [cart, setCart] = useState([]);

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

  const totalItemsCount = cart.reduce((total, cartItem) => total + cartItem.quantity, 0);
  const totalOrderPrice = cart.reduce((total, cartItem) => total + (cartItem.price * cartItem.quantity), 0);

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans antialiased">
      
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent">
          FoodHub.
        </h1>
        <div className="bg-orange-50 border border-orange-100 text-orange-700 font-semibold px-4 py-2 rounded-full text-sm flex items-center gap-2">
          <span>🛒 Cart Items:</span>
          <span className="bg-orange-600 text-white text-xs px-2 py-0.5 rounded-full font-bold">
            {totalItemsCount}
          </span>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6 flex flex-col lg:flex-row gap-8">
        
        <main className="flex-1">
          <MenuGrid menuItems={FOOD_MENU} onAddToCart={handleAddToCart} />
        </main>

        {/* <aside className="w-full lg:w-80 bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 h-fit lg:sticky lg:top-24">
          <h2 className="text-lg font-bold text-neutral-800 border-b border-neutral-100 pb-3 mb-4">
            Shopping Cart
          </h2>
          <div className="text-sm text-neutral-500 italic space-y-2">
            <p>Active items in state: {cart.length}</p>
            <p className="font-semibold text-neutral-800">Live Calculated Total: ${totalOrderPrice.toFixed(2)}</p>
            <p className="text-xs text-neutral-400 mt-2">
              (Component 4 will hook into this space next!)
            </p>
          </div>
        </aside> */}
        <aside className="w-full lg:w-80 bg-white border border-neutral-200 shadow-sm rounded-2xl p-6 h-fit lg:sticky lg:top-24">
          <CartSidebar cart={cart} totalPrice={totalOrderPrice} />
        </aside>

      </div>
    </div>
  );
}