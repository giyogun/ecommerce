import React, { useContext } from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Cart from "./Cart";
import AppContext from "../context/appContext";


const Layout = ({children}) => {
  const ctx = useContext(AppContext);

  return (
    <div className="layout">
      <Head>
        <title>Store</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className='main-container'>{children}</main>
      {ctx.showCart && <Cart />}
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
