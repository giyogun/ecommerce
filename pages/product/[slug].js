import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import {
  AiFillStar,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineStar,
} from "react-icons/ai";
import Product from "../../components/Product";
import AppContext from "../../context/appContext";
import { client, urlFor } from "../../lib/client";

const ProductDetails = ({ product, products }) => {
  const [index, setIndex] = useState(0);
  const [amount, setAmount] = useState(0);
  const ctx = useContext(AppContext);
  const { addProduct, setShowCart } = ctx;
  const { image, name, details, price } = product;
  const qty = amount === 0 ? 1 : amount;

  const checkoutHandler = () => {
    addProduct({ ...product, qty });
    setShowCart();
  };

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div>
            <img
              src={urlFor(image && image[index]).url()}
              className="product-detail-image"
            />
          </div>
          <div className="small-images-container">
            {image?.map((img, i) => (
              <img
                src={urlFor(img).url()}
                className={
                  i === index ? "small-image selected-image" : "small-image"
                }
                key={i}
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiOutlineStar />
              <AiOutlineStar />
              <AiOutlineStar />
              <AiOutlineStar />
              <AiOutlineStar />
            </div>
            <p>(0)</p>
          </div>
          <h4>Details:</h4>
          <p>{details}</p>
          <p className="price">{`$${price}`}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span
                className="minus"
                onClick={() => setAmount(amount <= 0 ? 0 : amount - 1)}
              >
                <AiOutlineMinus />
              </span>
              <span className="num">{amount}</span>
              <span className="plus" onClick={() => setAmount(amount + 1)}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button
              className="add-to-cart"
              onClick={() => {
                addProduct({ ...product, qty });
                toast.success(
                  `${qty} ${
                    qty === 1 ? "item" : "items"
                  } successfully added to cart`,
                  { id: "itemAdd" }
                );
              }}
            >
              Add to Cart
            </button>
            <button className="buy-now" onClick={checkoutHandler}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((p) => (
              <Product key={p._id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const products = await client.fetch(`*[_type == "product"]{
    slug {
      current
    }
  }`);

  return {
    fallback: "blocking",
    paths: products.map((p) => ({
      params: { slug: p.slug.current },
    })),
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const product = await client.fetch(
    `*[_type == "product" && slug.current == "${slug}"][0]`
  );
  const products = await client.fetch(`*[_type == "product"]`);

  return {
    props: { product, products },
  };
};

export default ProductDetails;
