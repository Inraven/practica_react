import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App.jsx'
import Layout from "./pages/layout.jsx";  
import About from "./pages/about.jsx";  
import Contact from "./pages/contact.jsx";
import Page11 from "./pages/page11.jsx";
import Page12 from "./pages/page12.jsx";
import Page13 from "./pages/page13.jsx";
import Page14 from "./pages/page14.jsx";
import Page15 from "./pages/page15.jsx";
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path="About" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="Page11" element={<Page11 />} />
          <Route path="Page12" element={<Page12 />} />
          <Route path="Page13" element={<Page13 />} />
          <Route path="Page14" element={<Page14 />} />
          <Route path="Page15" element={<Page15 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
