import React, { useState } from "react";
import {
  AiFillStar,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineStar,
} from "react-icons/ai";
import Product from "../../components/Product";
import { urlFor, client } from "../../lib/client";

const ProductDetails = ({ product, products }) => {
  const [index, setIndex] = useState(0);
  const { image, name, details, price } = product;
  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img
              src={urlFor(image && image[index])}
              className="product-detail-image"
            />
          </div>
          <div className="small-images-container">
            {image?.map((img, i) => (
              <img
                src={urlFor(img)}
                className={
                  i === index ? "small-image selected-image" : "small-image"
                }
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
              {/* <AiOutlineMinus /> */}
            </div>
            <p>(20)</p>
          </div>
          <h4>Details:</h4>
          <p>{details}</p>
          <p className="price">{`$${price}`}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus">
                <AiOutlineMinus />
              </span>
              <span className="num">0</span>
              <span className="plus">
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button className="add-to-cart">Add to Cart</button>
            <button className="buy-now">Buy Now</button>
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
