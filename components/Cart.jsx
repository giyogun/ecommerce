import React, { useContext } from "react";
import CartModal from "./CartModal";
import AppContext from "../context/appContext";
import CartItem from "./CartItem";
import { TiShoppingCart } from "react-icons/ti";
import Link from "next/link";

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
      {ctx.items.length <= 0 && (
        <div className="empty-cart">
          <TiShoppingCart style={{ color: "#07245c" }} size={150} />
          <h3>Nothing in your cart 😟</h3>
          <Link href="/">
            <button
              className="btn"
              type="button"
              onClick={() => ctx.setShowCart()}
            >
              Continue Shopping
            </button>
          </Link>
        </div>
      )}
      <div className="total-cart">
        <span>{ctx.items.length > 0 && "Total Amount"}</span>
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
