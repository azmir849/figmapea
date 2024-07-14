import "@/src/styles/index.scss"
import 'react-toastify/dist/ReactToastify.css';
if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
}


export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
