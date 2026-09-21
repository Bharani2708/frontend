import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Products from './components/Product';
import Cart from './components/Cart';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Products/>}/>
      <Route path="/cart" element={<Cart/>}/>
    </Routes>
  </BrowserRouter>
  )
}

export default App
