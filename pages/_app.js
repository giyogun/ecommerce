import Layout from "../components/Layout";
import ContextProvider from "../context/contextProvider";
import "../styles/globals.css";
import {Toaster} from 'react-hot-toast'

function MyApp({ Component, pageProps }) {
  return (
    <ContextProvider>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </ContextProvider>
  );
}

export default MyApp;
