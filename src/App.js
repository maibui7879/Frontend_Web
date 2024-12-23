import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import MenuList from "./components/MenuList";
import Footer from "./components/Footer";
import OrderForm from "./components/OrderForm";
import Reserve from "./components/Reserve"; // Trang Đặt Bàn
import ManagerPage from "./components/ManagerPage"; // Trang Quản Lý
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HomePage from "./components/HomePage";
import CustomerSupport from "./components/FeedbackForm";
import NewsPage from "./components/NewsPage";
import Article1 from "./components/Articles/Article1";
import Article2 from "./components/Articles/Article2";
import Article3 from "./components/Articles/Article3";
import Article4 from "./components/Articles/Article4";
import Article5 from "./components/Articles/Article5";
import Article6 from "./components/Articles/Article6";
import Article7 from "./components/Articles/Article7";
import ScrollToTop from "./components/ScrollToTop"; // ScrollToTop component
import Promotion from "./components/Promotion";
import Employee from "./components/Employee";
import Home from "./components/Home";
import Invoice from "./components/Invoice";
import MenuEditor from "./components/MenuEditor";
import Revenue from "./components/Revenue";
const App = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState(null); // State for selected menu item
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [isAdmin, setIsAdmin] = useState(false); // State for admin mode
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("loggedIn") === "true"); // Track login state
  const [activeView, setActiveView] = useState("home"); // Default view
  
  // Check for login state and set isAdmin accordingly
  useEffect(() => {
    const loggedInStatus = localStorage.getItem("loggedIn") === "true";
    setLoggedIn(loggedInStatus);
    if (loggedInStatus) {
      setIsAdmin(true); // Set admin mode when logged in
    }
  }, []);
  
  const handleOrderClick = (menuItem) => {
    setSelectedMenuItem(menuItem); // Set selected menu item
    setIsModalOpen(true); // Open modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close modal
    setSelectedMenuItem(null); // Clear selected menu item
  };

  // Private route component to protect admin pages
  const PrivateRoute = ({ element, ...rest }) => {
    const loggedInStatus = localStorage.getItem("loggedIn") === "true";
    return loggedInStatus ? element : <Navigate to="/" />; 
  };

  const toggleAdminMode = (status) => {
    setIsAdmin(status); 
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedIn"); 
    setLoggedIn(false); 
    setIsAdmin(false); 
  };
  
  const handleLogin = () => {
    localStorage.setItem("loggedIn", "true");
    setLoggedIn(true); 
    setIsAdmin(true); 
    closeModal(); 
  };

  const handleViewChange = (view) => {
    setActiveView(view); 
  };

  return (
    <Router>
      <ScrollToTop /> 
      <Header 
        isAdmin={isAdmin} 
        setSearchQuery={setSearchQuery} 
        toggleAdminMode={toggleAdminMode} 
        onViewChange={handleViewChange} 
      /> 

      <Routes>
      
        <Route path="/" element={<HomePage />} />


        <Route
          path="/thucdon"
          element={<MenuList handleOrderClick={handleOrderClick} searchQuery={searchQuery} />}
        />


        <Route path="/reserve" element={<Reserve />} />


        <Route
          path="/manager"
          element={<PrivateRoute element={<ManagerPage />} />}
        />

        <Route path="/news" element={<NewsPage />} />
        <Route path="/article1" element={<Article1 />} />
        <Route path="/article2" element={<Article2 />} />
        <Route path="/article3" element={<Article3 />} />
        <Route path="/article4" element={<Article4 />} />
        <Route path="/article5" element={<Article5 />} />
        <Route path="/article6" element={<Article6 />} />
        <Route path="/article7" element={<Article7 />} />
        <Route path="/promotions" element={<Promotion />} />
        <Route path="/feedback" element={<CustomerSupport />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/menuEditor" element={<MenuEditor />} />
        <Route path="/home" element={<Home />} />
        <Route path="/revenue" element={<Revenue />} />
      </Routes>

  
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <OrderForm
              menuItem={selectedMenuItem} 
              closeModal={closeModal} 
            />
          </div>
        </div>
      )}

      <Footer 
        toggleAdminMode={toggleAdminMode} 
        isAdmin={isAdmin} 
        handleLogout={handleLogout} 
        handleLogin={handleLogin} 
      /> 
    </Router>
  );
};

export default App;
