import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { products } from "../data/products";
import { useCart } from "../store/CartStore";
import Header from "../components/Header";
import Footer from "../components/Footer";

function ProductDetail() {
  const { id } = useParams();
  const prod = products.find((p) => p.id == id);
  const { addToCart, cart, increaseQuantity, decreaseQuantity } = useCart();
  const [qty, setQty] = useState(1);

  if (!prod) {
    return (
      <>
      <Header />
      <div className="text-center py-20 text-xl">Mahsulot topilmadi</div>
      <Footer />
      </>
    )
  }

  const name = prod.name
  const category = prod.category
  const brand = prod.brand
  const price = prod.price
  const discount = prod.discount
  const rating = prod.rating
  const reviews = prod.reviews
  const image = prod.image
  const status = prod.status
  const description = prod.description
  const color = prod.color
  const memory = prod.memory
  const warranty = prod.warranty

  const newPrice = Math.floor(price - (price * discount) / 100)
  const inCart = cart.find(i => i.id == prod.id)

  function addNow() {
    for(let i=0; i<qty; i++){
      addToCart(prod)
    }
    toast.success("Savatga qo'shildi")
    setQty(1)
  }

  return (
    <>
    <Header />
    <section className="max-w-5xl mx-auto my-16 grid grid-cols-1 md:grid-cols-2 gap-10 px-4">
      <img src={image} alt={name} className="w-full rounded-2xl object-cover" />

      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="badge badge-primary">{category}</span>
          <span className={status == "Mavjud" ? "badge badge-success" : "badge badge-error"}>{status}</span>
        </div>

        <h1 className="text-3xl font-bold mb-2">{name}</h1>
        <p className="opacity-70 mb-2">{brand}</p>

        <div className="flex items-center gap-2 mb-4">
          ⭐️ {rating} <span className="opacity-60">({reviews} reviews)</span>
        </div>

        <p className="mb-4">{description}</p>

        <div className="mb-4">
          <p className="text-3xl font-bold text-primary">{newPrice.toLocaleString()} so'm</p>
          <div className="flex items-center gap-2">
            <p className="line-through opacity-50">{price.toLocaleString()} so'm</p>
            <span className="badge badge-error">-{discount}%</span>
          </div>
        </div>

        <div className="mb-4 space-y-1 text-sm opacity-80">
          {color && <p>Rang: {color}</p>}
          {memory && <p>Xotira: {memory}</p>}
          {warranty && <p>Kafolat: {warranty}</p>}
        </div>

        <div className="flex items-center gap-3 mb-6">
          <button className="btn btn-sm" onClick={() => qty > 1 ? setQty(qty-1) : setQty(1)}>-</button>
          <span className="font-semibold">{qty}</span>
          <button className="btn btn-sm" onClick={() => setQty(qty+1)}>+</button>
        </div>

        <button onClick={addNow} className="btn btn-primary w-full">Savatga qo'shish</button>

        {inCart &&
        <div className="flex items-center gap-3 mt-4">
          <span className="text-sm">Savatda: {inCart.quantity} ta</span>
          <button className="btn btn-xs" onClick={() => decreaseQuantity(prod.id)}>-</button>
          <button className="btn btn-xs" onClick={() => increaseQuantity(prod.id)}>+</button>
        </div>
        }

        <Link to="/" className="link mt-6 inline-block">← Ortga qaytish</Link>
      </div>
    </section>
    <Footer />
    </>
  );
}

export default ProductDetail;