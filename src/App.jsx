import { useState, useEffect } from 'react';
import MenuGrid from './components/MenuGrid';
import CartSidebar from './components/CartSidebar';

const FOOD_MENU = [
  // Pizzas
  { id: 1, name: 'Pepperoni Pizza', price: 12.99, category: 'Pizzas', isVeg: false, image: '/images/pepperoni-pizza.jpg', description: 'Freshly baked crust layered with signature herb tomato sauce, premium mozzarella, and savory crispy-edged pepperoni slices.' },
  { id: 2, name: 'Margherita Pizza', price: 10.49, category: 'Pizzas', isVeg: true, image: '/images/margherita-pizza.jpg', description: 'A timeless Italian classic featuring house-made tomato sauce, fresh creamy mozzarella rounds, a drizzle of extra virgin olive oil, and aromatic garden basil.' },
  { id: 3, name: 'Spicy BBQ Chicken Pizza', price: 13.99, category: 'Pizzas', isVeg: false, image: '/images/chicken-pizza.jpg', description: 'Tender grilled chicken strips tossed in smoky honey BBQ sauce, paired with red onions, fresh cilantro, and a blend of smoked provolone and mozzarella.' },
  
  // Burgers
  { id: 4, name: 'Classic Cheeseburger', price: 8.49, category: 'Burgers', isVeg: false, image: '/images/cheeseburger.jpg', description: 'Flame-broiled smash beef patty topped with melted cheddar cheese, crisp butter lettuce, ripe tomato slices, pickles, and our signature secret house sauce on a toasted brioche bun.' },
  { id: 5, name: 'Crispy Chicken Burger', price: 9.29, category: 'Burgers', isVeg: false, image: '/images/chicken-burger.jpg', description: 'Golden-fried buttermilk chicken breast with a fiery spice rub, accompanied by creamy garlic slaw and sweet pickle chips on a soft potato bun.' },
  { id: 6, name: 'Spicy Black Bean Burger', price: 7.99, category: 'Burgers', isVeg: true, image: '/images/bean-burger.jpg', description: 'A protein-packed artisan black bean, corn, and brown rice patty spiced with chipotle, topped with avocado mash and crisp sprouts.' },
  
  // Sides & Salads
  { id: 7, name: 'Crispy French Fries', price: 3.99, category: 'Sides', isVeg: true, image: '/images/french-fries.jpg', description: 'Thick-cut skin-on potatoes fried to golden perfection, tossed lightly in sea salt and a touch of cracked black pepper. Served with garlic aioli.' },
  { id: 8, name: 'Veggie Caesar Salad', price: 7.99, category: 'Sides', isVeg: true, image: '/images/caesar-salad.jpg', description: 'Crisp hearts of romaine lettuce tossed in a creamy eggless Caesar dressing, loaded with house-baked garlic croutons and shaved vegetarian parmesan cheese.' },
  
  // Drinks
  { id: 9, name: 'Chocolate Milkshake', price: 4.49, category: 'Drinks', isVeg: true, image: '/images/milkshake.jpg', description: 'Rich, velvet-smooth premium dark chocolate ice cream blended with whole milk, topped with fresh whipped cream and chocolate shavings.' },
  { id: 10, name: 'Iced Lemon Tea', price: 2.99, category: 'Drinks', isVeg: true, image: '/images/iced-tea.jpg', description: 'Freshly brewed black tea leaves chilled and infused with real squeezed lemon juice and a touch of organic pure cane sugar.' }
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

  const handleRemoveFromCart = (itemOrId) => {
    // Extract the numeric ID safely regardless of whether an object or primitive ID is provided
    const targetId = typeof itemOrId === 'object' && itemOrId !== null ? itemOrId.id : itemOrId;

    setCart((prevCart) =>
      prevCart
        .map((cartItem) =>
          cartItem.id === targetId
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
        .filter((cartItem) => cartItem.quantity > 0) // Automatically drop items hitting 0
    );
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
          <MenuGrid 
            menuItems={FOOD_MENU} 
            onAddToCart={handleAddToCart} 
            cart={cart}
            onRemoveFromCart={handleRemoveFromCart}
            />
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