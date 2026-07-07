import React from "react";
import { v4 as uuidv4 } from 'uuid';
function CartModal() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const totalPrice = cart.reduce((total, product) => {
    const discountedPrice =
      product.price - (product.price * product.discount) / 100;

    return total + discountedPrice * product.quantity;
  }, 0);

  return (
    <div className="bg-white shadow-2xl rounded-2xl w-[800px] h-[500px] fixed top-14 right-5 z-20 p-5">
      <h2 className="text-2xl font-bold mb-5">🛒 Savatcha</h2>

      {cart.length === 0 ? (
        <div className="flex justify-center items-center h-[350px]">
          <p className="text-gray-500 text-lg">Savatcha bo'sh</p>
        </div>
      ) : (
        <>
          <div className="space-y-4 h-[320px] overflow-y-auto pr-2">
            {cart.map((product) => {
              const discountedPrice =
                product.price - (product.price * product.discount) / 100;

              return (
                <div
                  key={product.id}
                  className="flex items-center gap-4 border rounded-xl p-3"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{product.name}</h3>

                    <p className="text-sm text-gray-500">
                      {product.brand} • {product.color} • {product.memory}
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-lg font-bold text-primary">
                        {discountedPrice.toLocaleString()} so'm
                      </span>

                      <span className="text-sm line-through text-gray-400">
                        {product.price.toLocaleString()} so'm
                      </span>
                    </div>

                    <div className="join mt-3">
                      <button className="btn btn-xs join-item">-</button>

                      <button className="btn btn-xs join-item btn-disabled">
                        {product.quantity}
                      </button>

                      <button className="btn btn-xs join-item">+</button>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between items-end h-20">
                    <button className="btn btn-circle btn-xs btn-error">
                      ✕
                    </button>

                    <span className="font-semibold">
                      {(discountedPrice * product.quantity).toLocaleString()}{" "}
                      so'm
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="border-t mt-5 pt-4">
            <div className="flex justify-between items-center text-xl font-bold">
              <span>Jami:</span>

              <span>{totalPrice.toLocaleString()} so'm</span>
            </div>

            <button className="btn btn-primary w-full mt-4">
              Buyurtma berish
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartModal;
