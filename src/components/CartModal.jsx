import React from "react";
import { useCart } from "../store/CartStore";

function CartModal() {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } =
    useCart();

  const totalPrice = cart.reduce((total, product) => {
    const discountedPrice =
      product.price - (product.price * product.discount) / 100;
    return total + discountedPrice * product.quantity;
  }, 0);

  return (
    <div className="bg-white shadow-2xl rounded-2xl w-[380px] sm:w-[420px] max-h-[520px] flex flex-col p-5 border border-gray-100">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-black">
        🛒 Savatcha
        {cart.length > 0 && (
          <span className="badge badge-primary badge-sm">{cart.length}</span>
        )}
      </h2>

      {cart.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-[280px] text-center gap-2">
          <span className="text-4xl">🛍️</span>
          <p className="text-gray-400">Savatcha bo'sh</p>
        </div>
      ) : (
        <>
          <div className="space-y-3 overflow-y-auto pr-1 flex-1">
            {cart.map((product) => {
              const discountedPrice =
                product.price - (product.price * product.discount) / 100;

              return (
                <div
                  key={product.id}
                  className="flex items-center gap-3 border border-gray-100 rounded-xl p-2 hover:bg-gray-50 transition"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm truncate text-black">
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-400 truncate">
                      {product.brand}
                    </p>

                    <span className="text-sm font-bold text-primary">
                      {discountedPrice.toLocaleString()} so'm
                    </span>

                    <div className="join mt-2">
                      <button
                        onClick={() => decreaseQuantity(product.id)}
                        className="btn btn-xs join-item"
                      >
                        -
                      </button>
                      <button className="btn btn-xs join-item btn-disabled !text-black">
                        {product.quantity}
                      </button>
                      <button
                        onClick={() => increaseQuantity(product.id)}
                        className="btn btn-xs join-item"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between items-end h-16">
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="btn btn-circle btn-xs btn-error text-white"
                    >
                      ✕
                    </button>
                    <span className="font-semibold text-sm whitespace-nowrap text-black">
                      {(discountedPrice * product.quantity).toLocaleString()}{" "}
                      so'm
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="border-t mt-4 pt-3">
            <div className="flex justify-between items-center text-lg font-bold text-black">
              <span>Jami:</span>
              <span className="text-primary">
                {totalPrice.toLocaleString()} so'm
              </span>
            </div>

            <button className="btn btn-primary w-full mt-3">
              Buyurtma berish
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartModal;