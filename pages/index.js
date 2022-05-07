import React from "react";
import { client } from "../lib/client";
import FooterBanner from "../components/FooterBanner";
import HeroBanner from "../components/HeroBanner";
import Product from "../components/Product";

const Home = ({ products, banner }) => {
  return (
    <>
      <HeroBanner heroBanner={banner.length && banner[0]} />

      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>

      <div className="products-container">
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>

      <FooterBanner footerBanner={banner && banner[0]} />
    </>
  );
};

export const getServerSideProps = async () => {
  const products = await client.fetch(`*[_type == "product"]`);
  const banner = await client.fetch(`*[_type == "banner"]`);

  return {
    props: { products, banner },
  };
};

export default Home;
