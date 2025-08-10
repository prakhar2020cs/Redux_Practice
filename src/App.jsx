
import { Link, Route, Routes } from 'react-router-dom'
import './App.css'
import Product from './components/Product'
import Cart from './components/Cart'
import Dashboard from './components/Dashboard'
import Layout from './components/Layout'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <>
      <div>
      
 <Routes>
          <Route path='/' element={<Layout/>}>
       <Route index element={<Dashboard />} />
          <Route path="/products" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          </Route>

         
        </Routes>
       
      </div>
    </>
  )
}

export default App
