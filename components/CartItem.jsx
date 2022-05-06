import { useContext } from "react";
import AppContext from "../context/appContext";
import { urlFor } from "../lib/client";

const CartItem = ({ product }) => {
  const ctx = useContext(AppContext);
  const { name, price, qty, _id, image } = product;

  const formattedPrice = `$${price.toFixed(2)}`;

  return (
    <li className="cart-item">
      <div className="tryout">
        <img src={urlFor(image[0]).url()} />
        <div className="summary">
          <h4>{name}</h4>
          <span className="price-cart-item">{formattedPrice}</span>
          <span className="amount">x {qty}</span>
        </div>
      </div>
      <div className="actions-cart-item">
        <button onClick={() => ctx.removeProduct(_id)}>−</button>
        <button onClick={() => ctx.addProduct({ ...product, qty: 1 })}>
          +
        </button>
      </div>
    </li>
  );
};

export default CartItem;
