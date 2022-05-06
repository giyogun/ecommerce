import React, { useContext } from "react";
import CartModal from "./CartModal";
import AppContext from "../context/appContext";
import CartItem from "./CartItem";

const Cart = () => {
  const ctx = useContext(AppContext);

  const totAmt = `$${ctx.totalAmount.toFixed(2)}`;

  const cartItems = (
    <ul className="cart-items">
      {ctx.items.map((item) => (
        <CartItem key={item._id} product={item} />
      ))}
    </ul>
  );
  return (
    <CartModal>
      <h2 className="cart-heading">Shopping Cart</h2>
      {cartItems}
      <div className="total-cart">
        <span>{ctx.items.length ? "Total Amount" : "Your Cart is Empty"}</span>
        {ctx.items.length > 0 && <span>{totAmt}</span>}
      </div>
      <div className="actions">
        <button className="button--alt" onClick={() => ctx.setShowCart()}>
          Close
        </button>
        {ctx.items.length > 0 && (
          <button className="button-cart">Checkout</button>
        )}
      </div>
    </CartModal>
  );
};

export default Cart;
