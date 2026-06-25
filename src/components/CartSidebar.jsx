export default function CartSidebar({ cart, totalPrice, onRemoveFromCart, onIncrementFromCart, onClearCart }) {
  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-neutral-100 pb-4 mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-neutral-900 tracking-tight">
          Your Order Summary
        </h2>
          <div className="flex items-center gap-2">
          {/* 2. Short-circuit conditional evaluation engine to inject the Clear All button */}
          {cart.length > 0 && (
            <button
              onClick={onClearCart}
              className="text-[10px] font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 border border-red-100 px-2 py-1 rounded-md uppercase tracking-wider transition-colors cursor-pointer"
            >
              Clear All
            </button>
          )}
        <span className="text-xs font-semibold text-neutral-400 bg-neutral-50 border border-neutral-100 px-2 py-0.5 rounded-md uppercase tracking-wider">
          Live Sync
        </span>
        </div>
      </div>

      {cart.length === 0 ? (
        <div className="py-12 flex flex-col items-center justify-center text-center">
          <span className="text-4xl mb-3 opacity-80">🥞</span>
          <p className="text-neutral-400 font-semibold text-sm">Your basket is completely empty.</p>
          <p className="text-neutral-300 text-xs mt-1">Add something tasty to begin!</p>
        </div>
      ) : (
        <div className="flex flex-col flex-1 justify-between">
          
          <ul className="divide-y divide-neutral-100 overflow-y-auto max-h-80 pr-1 custom-scrollbar">
            {cart.map((cartItem) => (
              <li key={cartItem.id} className="py-3 flex justify-between items-center text-sm group">
                <div className="flex flex-col pr-2">
                  <span className="font-bold text-neutral-800">
                    {cartItem.name}
                  </span>
                  <span className="text-xs text-neutral-400 mt-0.5">
                    Quantity: <strong className="text-neutral-600 font-bold">x{cartItem.quantity}</strong>
                  </span>
                </div>
                
                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-mono font-bold text-neutral-900 text-xs mr-1">
                    ${(cartItem.price * cartItem.quantity).toFixed(2)}
                  </span>
                  
                  {/* Symmetrical Controls: Minus and Plus Button Row */}
                  <div className="flex items-center border border-neutral-200 rounded-lg overflow-hidden bg-neutral-50 shadow-sm">
                    <button 
                      onClick={() => onRemoveFromCart(cartItem.id)}
                      className="bg-white hover:bg-red-50 text-neutral-500 hover:text-red-600 h-6 w-6 flex items-center justify-center font-bold text-xs transition-colors cursor-pointer border-r border-neutral-200"
                      title="Reduce Quantity"
                    >
                      —
                    </button>
                    <button 
                      onClick={() => onIncrementFromCart(cartItem)}
                      className="bg-white hover:bg-green-50 text-neutral-500 hover:text-green-600 h-6 w-6 flex items-center justify-center font-bold text-xs transition-colors cursor-pointer"
                      title="Increase Quantity"
                    >
                      +
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="border-t border-neutral-100 pt-4 mt-6">
            <div className="flex justify-between items-center font-bold text-neutral-900 mb-4">
              <span className="text-base tracking-tight text-neutral-700">Aggregate Total:</span>
              <span className="text-2xl font-extrabold font-mono text-orange-600">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            
            <button 
              onClick={() => alert(`Order Placed Mockup State!\nTotal Amount: $${totalPrice.toFixed(2)}`)}
              className="w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold text-sm py-3 px-4 rounded-xl shadow-md transition-all transform active:scale-[0.98]"
            >
              Proceed to Checkout
            </button>
          </div>

        </div>
      )}
    </div>
  );
}