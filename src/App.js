import './App.css';
// react router v6
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
// pages
import { Home, CategoryProduct, ProductSingle, Cart, Search } from "./pages/index";

import LoginScreen from "./pages/AuthPage/Login";
import SignupScreen from "./pages/AuthPage/Signup";
import InstallBanner from './components/PWA';
// components
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Footer from "./components/Footer/Footer";
import store from "./store/store";
import { Provider } from "react-redux";
import OrderPage from './pages/OrderPage/OrderPage';
import OrderDetails from './pages/OrderPage/OrderDetail';
import About from './pages/About/About';
import Privacy from './pages/Privacy/privacy';

function LayoutWrapper({ children }) {
  const location = useLocation();
  const noLayoutPaths = ['/login', '/signup'];
  const hideLayout = noLayoutPaths.includes(location.pathname);

  return (
    <>
      {!hideLayout && <Header />}
      {!hideLayout && <Sidebar />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
}

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <LayoutWrapper>
            <Routes>
              {/* home page route */}
              <Route path="/" element={<Home />} />
              {/* single product route */}
              <Route path="/product/:id" element={<ProductSingle />} />
              {/* category wise product listing route */}
              <Route path="/category/:category" element={<CategoryProduct />} />
              {/* cart */}
              <Route path="/cart" element={<Cart />} />
              {/* searched products */}
              <Route path="/search/:searchTerm" element={<Search />} />
              <Route path="/orders" element={<OrderPage />} />
              <Route path="/orders/:id" element={<OrderDetails />} />
              <Route path="/about" element={<About />} />

              <Route path="/privacy" element={<Privacy />} />

              {/* auth routes */}
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/signup" element={<SignupScreen />} />


              
            </Routes>
          </LayoutWrapper>
        </BrowserRouter>
      </Provider>
      <InstallBanner />
    </div>
  );
}

export default App;
