import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar, faStarHalfAlt, faStarOfDavid } from '@fortawesome/free-solid-svg-icons';
import ProductForm from './Components/ProductForm';
import ProductPage from './Components/ProductPage';
import ProductCard from './Components/ProductCard';
import Footer from './Components/Footer'
import Cart from './Components/Cart';
import Order from './Components/Order';
import AddressComponent from './Components/AddressComponent';
import ProductState from './context/ProductState';
import CategoryState from './context/CategoryState';
import CartState from './context/CartState';
import AddressState from './context/AddressState'
import OrderState from './context/OrderState';
import UserState from './context/UserState';
import CheckOut from './Components/CheckOut';
import Profile from './Components/Profile';

library.add(faStar, faStarHalfAlt, faStarOfDavid);

function App() {
  return (
    <Router>
      <ProductState>
        <CategoryState>
          <CartState>
            <AddressState>
              <OrderState>
                <UserState>  
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admin" element={<ProductForm />} />
                <Route path="/product" element={<ProductPage />} />
                <Route path="/productcard" element={<ProductCard />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/order" element={<Order />} />
                <Route path="/address" element={<AddressComponent />} />
                <Route path="/CheckOut" element={<CheckOut />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
              <Footer />
              </UserState>
              </OrderState>
            </AddressState>
          </CartState>
        </CategoryState>
      </ProductState>
    </Router>
  );
}

export default App;
