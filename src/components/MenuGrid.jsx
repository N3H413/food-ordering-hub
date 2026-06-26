import { useState } from 'react';
import FoodCard from './FoodCard';

export default function MenuGrid({ menuItems, onAddToCart, cart, onRemoveFromCart }) {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const categories = ['All', 'Pizzas', 'Burgers', 'Veg Only', 'Sides', 'Drinks'];

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = 
      activeTab === 'All' || 
      (activeTab === 'Veg Only' ? item.isVeg === true : item.category === activeTab);
    
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const modalCartItem = selectedItem ? cart.find((c) => c.id === selectedItem.id) : null;
  const modalQuantity = modalCartItem ? modalCartItem.quantity : 0;

  return (
    <section aria-labelledby="menu-heading">
      {/* Header Search Group */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 id="menu-heading" className="text-2xl font-bold tracking-tight text-neutral-900">
            Explore Our Menu
          </h2>
          <p className="text-sm text-neutral-500 mt-1">
            Select items to add to cart.
          </p>
        </div>

        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search food items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 text-sm bg-white border border-neutral-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all shadow-sm"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-neutral-400 hover:text-neutral-600 text-xs font-bold cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Category Navigation Bar */}
      <div className="flex flex-wrap gap-2 mb-8 pb-2 border-b border-neutral-100">
        {categories.map((categoryName) => {
          const isSelected = activeTab === categoryName;
          return (
            <button
              key={categoryName}
              onClick={() => setActiveTab(categoryName)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer transform active:scale-95 ${
                isSelected
                  ? 'bg-orange-500 text-white shadow-sm shadow-orange-500/20'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {categoryName}
            </button>
          );
        })}
      </div>

      {/* Primary Food Grid Array */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-12 text-neutral-400 text-sm bg-white border border-neutral-100 rounded-2xl shadow-sm">
          No items found matching this category filter configuration.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredItems.map((singleFoodItem) => {
            const exactCartItem = cart.find((c) => c.id === singleFoodItem.id);
            const absoluteQuantity = exactCartItem ? exactCartItem.quantity : 0;

            return (
              <FoodCard 
                key={singleFoodItem.id} 
                item={singleFoodItem} 
                quantity={absoluteQuantity} 
                onAddToCart={onAddToCart} 
                onRemoveFromCart={onRemoveFromCart} 
                onViewDetails={(item) => setSelectedItem(item)}
              />
            );
          })}
        </div>
      )}

      {selectedItem && (
        <div 
          onClick={() => setSelectedItem(null)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4 transition-all"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border border-neutral-100 flex flex-col"
          >
            {/* Header Image Cover */}
            <div className="relative h-56 bg-neutral-100">
              <img src={selectedItem.image} alt={selectedItem.name} className="w-full h-full object-cover" />
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm hover:bg-white text-neutral-700 h-8 w-8 rounded-full flex items-center justify-center font-bold shadow-sm cursor-pointer"
              >
                ✕
              </button>
              <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm border border-neutral-100 text-[10px] font-bold tracking-wide uppercase">
                <span className={`h-2 w-2 rounded-full ${selectedItem.isVeg ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className={selectedItem.isVeg ? 'text-green-700' : 'text-red-700'}>
                  {selectedItem.isVeg ? 'Veg' : 'Non-Veg'}
                </span>
              </div>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-start gap-4 mb-3">
                <h3 className="text-xl font-bold text-neutral-900">{selectedItem.name}</h3>
                <span className="font-mono font-extrabold text-lg text-neutral-900 bg-neutral-50 border border-neutral-100 px-2.5 py-0.5 rounded-xl">
                  ${selectedItem.price.toFixed(2)}
                </span>
              </div>
              
              <p className="text-neutral-500 text-sm leading-relaxed mb-6">
                {selectedItem.description}
              </p>

              {modalQuantity > 0 ? (
                <div className="flex items-center justify-between border border-neutral-200 rounded-xl overflow-hidden bg-neutral-50 shadow-sm h-12 w-full">
                  <button 
                    onClick={() => onRemoveFromCart(selectedItem.id)}
                    className="bg-white hover:bg-red-50 text-neutral-600 hover:text-red-600 h-full w-14 flex items-center justify-center font-bold text-lg transition-colors cursor-pointer"
                    title="Decrease Volume"
                  >
                    —
                  </button>
                  <span className="font-bold text-neutral-800 text-sm">
                    {modalQuantity} added to cart
                  </span>
                  <button 
                    onClick={() => onAddToCart(selectedItem)}
                    className="bg-white hover:bg-green-50 text-neutral-600 hover:text-green-600 h-full w-14 flex items-center justify-center font-bold text-lg transition-colors cursor-pointer"
                    title="Increase Volume"
                  >
                    +
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => onAddToCart(selectedItem)}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl shadow-md transition-all active:scale-[0.98] cursor-pointer"
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
