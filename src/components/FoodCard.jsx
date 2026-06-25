export default function FoodCard({ item, quantity, onAddToCart, onRemoveFromCart, onViewDetails }) {
  return (
    <div 
      onClick={() => onViewDetails(item)}
      className="group bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col max-w-sm relative cursor-pointer"
    >
      {/* Diet Badge */}
      <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm border border-neutral-100 text-[10px] font-bold tracking-wide uppercase">
        <span className={`h-2 w-2 rounded-full ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`} />
        <span className={item.isVeg ? 'text-green-700' : 'text-red-700'}>
          {item.isVeg ? 'Veg' : 'Non-Veg'}
        </span>
      </div>

      {/* Item Image */}
      <div className="w-full h-48 overflow-hidden bg-neutral-100 relative">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300" 
          loading="lazy"
        />
      </div>
      
      {/* Visual Content Body */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div className="flex justify-between items-start gap-4 mb-4">
          <h3 className="font-bold text-base sm:text-lg text-neutral-800 tracking-tight group-hover:text-orange-500 transition-colors">
            {item.name}
          </h3>
          <span className="font-extrabold text-neutral-900 bg-neutral-50 border border-neutral-100 px-2 py-0.5 rounded-lg shrink-0 text-sm sm:text-base">
            ${item.price.toFixed(2)}
          </span>
        </div>
        
        {/* Dynamic Action Button Controllers */}
        {quantity > 0 ? (
          <div className="flex items-center justify-between border border-neutral-200 rounded-xl overflow-hidden bg-neutral-50 shadow-sm h-11 w-full">
            <button 
              onClick={(e) => {
                e.stopPropagation(); // Avoid popping open the modal
                onRemoveFromCart(item.id);
              }}
              className="bg-white hover:bg-red-50 text-neutral-600 hover:text-red-600 h-full w-12 flex items-center justify-center font-bold text-base transition-colors cursor-pointer"
            >
              —
            </button>
            <span className="font-bold text-neutral-800 text-xs sm:text-sm">
              {quantity} added
            </span>
            <button 
              onClick={(e) => {
                e.stopPropagation(); // Avoid popping open the modal
                onAddToCart(item);
              }}
              className="bg-white hover:bg-green-50 text-neutral-600 hover:text-green-600 h-full w-12 flex items-center justify-center font-bold text-base transition-colors cursor-pointer"
            >
              +
            </button>
          </div>
        ) : (
          <button 
            onClick={(e) => {
              e.stopPropagation(); // Avoid popping open the modal
              onAddToCart(item);
            }}
            className="w-full bg-neutral-900 hover:bg-orange-600 text-white text-sm font-semibold h-11 rounded-xl transition-all duration-150 active:scale-[0.98] transform flex items-center justify-center cursor-pointer"
          >
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
}