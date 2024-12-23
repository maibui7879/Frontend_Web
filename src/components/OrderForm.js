import React, { useState, useEffect } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css"; 
import "./OrderForm.css";

const OrderForm = ({ closeModal, menuItem }) => {
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(menuItem.price * quantity);
  const [loading, setLoading] = useState(false); // Added loading state
  const [error, setError] = useState(null); // Added error state

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  // Fill in the form with selected menu item data
  useEffect(() => {
    if (menuItem) {
      setQuantity(1); // Default quantity
      setTotalPrice(menuItem.price);
    }
  }, [menuItem]);

  const handleQuantityChange = (e) => {
    const newQuantity = e.target.value;
    setQuantity(newQuantity);
    setTotalPrice(menuItem.price * newQuantity);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Clear previous error

    const order = {
      customer_name: customerName,
      phone: phone,
      address: address,
      order_items: [
        {
          menu_id: menuItem.id,
          quantity: parseInt(quantity), // Convert quantity to number
        },
      ],
    };

    console.log("Sending order data:", order);

    // Send POST request to backend
    axios
      .post("http://localhost:3001/api/orders", order)
      .then((response) => {
        setLoading(false);
        alert("Đặt món thành công!");
        closeModal(); // Close modal after successful order
      })
      .catch((error) => {
        setLoading(false);
        console.log("Error placing order:", error);
        if (error.response) {
          console.log("Error Response Data:", error.response.data);
          setError(error.response.data.error || "Có lỗi xảy ra khi đặt món.");
        } else {
          setError("Có lỗi xảy ra khi đặt món. Vui lòng thử lại.");
        }
      });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
      
      <div
        className="relative bg-cover bg-center px-6 rounded-lg max-w-lg w-full h-[95vh] flex flex-col overflow-auto animate-slide-down pb-4"
        style={{
          backgroundImage: "url('https://t4.ftcdn.net/jpg/02/92/20/37/360_F_292203735_CSsyqyS6A4Z9Czd4Msf7qZEhoxjpzZl1.jpg')",
        }}
        data-aos="fade-up" 
      >
        
        <div className="absolute inset-0 bg-black bg-opacity-20 rounded-lg"></div>

        
        <div className="relative z-10 flex flex-col justify-between h-full py-4">
          <h2 className="text-2xl font-bold text-center text-white mt-2" data-aos="fade-in">
            Đặt Món: {menuItem.name}
            <p className="font-bold text-lg" data-aos="fade-in">
              Đơn giá: {menuItem.price.toLocaleString()} VND
            </p>
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col mt-2" data-aos="fade-up">
            <div>
              <label className="block font-semibold text-black" htmlFor="name">
                Họ và Tên
              </label>
              <input
                type="text"
                id="name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full border-gray-300 rounded-md h-8 px-2"
                placeholder="Nguyễn Văn A"
                required
              />
            </div>
            <div>
              <label className="block font-semibold text-black" htmlFor="phone">
                Số Điện Thoại
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border-gray-300 rounded-md h-8 px-2"
                placeholder="0123456789"
                required
              />
            </div>
            <div>
              <label className="block font-semibold text-black" htmlFor="address">
                Địa Chỉ
              </label>
              <textarea
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full border-gray-300 rounded-md h-16 px-2"
                placeholder="123 ABC Street"
                required
              ></textarea>
            </div>
            <div>
              <label className="block font-semibold text-black" htmlFor="quantity">
                Số Lượng
              </label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={handleQuantityChange}
                className="w-full border-gray-300 rounded-md h-8 px-2"
                min="1"
                required
              />
            </div>
            <p className="font-bold text-lg text-black text-left mb-2" >
              Tổng Giá: <span className="text-green-500">{totalPrice.toLocaleString()} VND</span>
            </p>

            {/* Display error message if any */}
            {error && <p className="text-red-500 mt-2">{error}</p>}

            <div className="flex justify-between gap-4">
              <button
                type="button"
                onClick={closeModal}
                className="w-32 bg-red-500 text-white rounded hover:bg-red-600 h-10 flex items-center justify-center"
                
              >
                Hủy
              </button>
              <button
                type="submit"
                className="w-32 bg-green-500 text-white rounded hover:bg-green-600 h-10 flex items-center justify-center"
                disabled={loading} // Disable button while loading
                
              >
                {loading ? "Đang xử lý..." : "OK"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
