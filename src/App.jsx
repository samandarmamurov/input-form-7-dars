import React from "react";
import Home from "./pages/Home";
import { CartProvider } from "./store/CartStore";

function App() {
  return (
    <CartProvider>
      <Home />
    </CartProvider>
  );
}

export default App;