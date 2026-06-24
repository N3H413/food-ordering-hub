export default function FoodCard({ item, onAddToCart }) {
    return (
        <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col max-w-sm">
            <div className="w-full h-48 overflow-hidden bg-neutral-100">
                <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover" 
                />
            </div>
            
            <div className="p-5 flex flex-col flex-1 justify-between">
                <div className="flex justify-between items-start gap-4 mb-4">
                    <h3 className="font-bold text-lg text-neutral-800 tracking-tight">
                        {item.name}
                    </h3>
                    <span className="font-extrabold text-orange-600 shrink-0">
                        ${item.price.toFixed(2)}
                    </span>
                </div>
                
                <button 
                    onClick={() => onAddToCart(item)}
                    className="w-full bg-neutral-900 hover:bg-orange-600 text-white text-sm font-semibold py-3 rounded-xl transition-colors duration-150 active:scale-[0.98] transform"
                >
                    Add to cart
                </button>
            </div>
        </div>
    );
}