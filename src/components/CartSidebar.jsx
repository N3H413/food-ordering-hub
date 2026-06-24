export default function CartSidebar({ cart, totalPrice }) {
  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-neutral-100 pb-4 mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-neutral-900 tracking-tight">
          Your Order Summary
        </h2>
        <span className="text-xs font-semibold text-neutral-400 bg-neutral-50 border border-neutral-100 px-2 py-0.5 rounded-md uppercase tracking-wider">
          Live Sync
        </span>
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
                  <span className="font-bold text-neutral-800 group-hover:text-orange-600 transition-colors">
                    {cartItem.name}
                  </span>
                  <span className="text-xs text-neutral-400 mt-0.5">
                    Quantity: <strong className="text-neutral-600 font-bold">x{cartItem.quantity}</strong>
                  </span>
                </div>
                <span className="font-mono font-bold text-neutral-900 bg-neutral-50 px-2 py-1 rounded-md border border-neutral-100 text-xs shrink-0">
                  ${(cartItem.price * cartItem.quantity).toFixed(2)}
                </span>
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
              onClick={() => alert(`Order Placed Mockup State!\nTotal Amount: $${totalPrice.toFixed(2)}\nThank you for checking out our app demo!`)}
              className="w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold text-sm py-3 px-4 rounded-xl shadow-md shadow-orange-500/10 transition-all transform active:scale-[0.98]"
            >
              Proceed to Checkout
            </button>
          </div>

        </div>
      )}
    </div>
  );
}