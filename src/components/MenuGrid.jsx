import FoodCard from './FoodCard';
export default function MenuGrid({ menuItems, onAddToCart }) {
    return (
        <>
        <div className="mb-6 mt-6">
            <h2 className="text-2xl font-bold tracking-tight text-neutral-900">
                Explore Our Menu
            </h2>
            <p className="text-sm text-neutral-500 mt-1">
                Select your items to add them to your cart.
            </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((singleFoodItem) => (
                <FoodCard 
                    key={singleFoodItem.id}
                    item={singleFoodItem}
                    onAddToCart={onAddToCart}
                />
            ))}
        </div>
        </>
    );
}