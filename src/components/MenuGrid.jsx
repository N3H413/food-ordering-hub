import { useState } from 'react';
import FoodCard from './FoodCard';

export default function MenuGrid({ menuItems, onAddToCart }) {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  const categories = ['All', 'Pizzas', 'Burgers', 'Veg Only', 'Sides', 'Drinks'];

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = 
      activeTab === 'All' || 
      (activeTab === 'Veg Only' ? item.isVeg === true : item.category === activeTab);
    
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <section aria-labelledby="menu-heading">
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

      {filteredItems.length === 0 ? (
        <div className="text-center py-12 text-neutral-400 text-sm bg-white border border-neutral-100 rounded-2xl shadow-sm">
          No items found matching this category filter configuration.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredItems.map((singleFoodItem) => (
            <FoodCard 
              key={singleFoodItem.id} 
              item={singleFoodItem} 
              onAddToCart={onAddToCart} 
            />
          ))}
        </div>
      )}
    </section>
  );
}