import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Home from "./Home";
import Revenue from "./Revenue";
import Employee from "./Employee";
import Invoice from "./Invoice";
import MenuEditor from "./MenuEditor";
import axios from "axios";
import Inventory from "./Inventory";
const ManagerPage = () => {
  const [activeView, setActiveView] = useState("home");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [employeeName, setEmployeeName] = useState("Quản lý");

  useEffect(() => {
    // Fetch orders from the server
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/orders");
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };

    // Retrieve employee name from local storage
    const employeeName = localStorage.getItem("taiKhoan");
    if (employeeName) {
      setEmployeeName(employeeName);
    }

    // Fetch orders and employee details when the component mounts
    fetchOrders();
  }, []);

  // Handle view change
  const handleViewChange = (view) => {
    setActiveView(view);
  };

  // Determine title based on active view


  return (
    <div className="flex">
      <Sidebar onViewChange={handleViewChange} /> {/* Sidebar to navigate between views */}
      <div className="flex-1 ">

        {/* Render the corresponding component based on active view */}
        {activeView === "home" && <Home onViewChange={handleViewChange} />}
        {activeView === "revenue" && <Revenue orders={orders} loading={loading} />}
        {activeView === "employee" && <Employee />}
        {activeView === "invoice" && <Invoice />}
        {activeView === "menuEditor" && <MenuEditor />}
        {activeView === "inventory" && <Inventory />}
      </div>
    </div>
  );
};

export default ManagerPage;
