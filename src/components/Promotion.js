import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTag, FaGift, FaPercent } from "react-icons/fa"; // Icons for promotions
import "./Promotion.css"

const Promotion = ({ searchQuery }) => {
  const [promotions, setPromotions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Tất Cả");
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/promotions") // Replace with your API for promotions
      .then((response) => setPromotions(response.data))
      .catch((error) => console.error(error));
  }, []);

  const filteredPromotions = promotions.filter((promo) => {
    const matchesSearch = promo.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "Tất Cả" || promo.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCategoryChange = (category) => {
    if (category === selectedCategory) return;

    setIsAnimating(true);
    setTimeout(() => {
      setSelectedCategory(category);
      setIsAnimating(false);
    }, 300); // Delay for animation
  };

  // Dynamic title based on the selected category
  const categoryTitle = selectedCategory === "Tất Cả" ? "Khuyến Mãi" : selectedCategory;

  return (
    <div className="flex promotion">
      <div className="sidebar">
        <h2 className="text-2xl font-bold mb-6 text-white">Danh Mục</h2>
        <div className="mb-4">
          {[
            { category: "Tất Cả", icon: <FaTag /> },
            { category: "Discount", icon: <FaPercent /> },
            { category: "Special Offer", icon: <FaGift /> },
          ].map(({ category, icon }) => (
            <button
              key={category}
              className={`flex items-center justify-start w-full py-2 mb-2 text-white hover:bg-transparent hover:text-blue-500 rounded ${
                selectedCategory === category ? "font-bold text-blue-500" : ""
              }`}
              onClick={() => handleCategoryChange(category)}
            >
              {icon}
              <span className="ml-2">{category}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="main-content-1">
        <h2 className="text-5xl font-fancy text-center mb-4">
          <i>
            <b style={{ color: "#2c3e50" }}>{categoryTitle}</b>
          </i>
        </h2>

        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-transform duration-500 ease-in-out ${
            isAnimating ? "fade-out" : "fade-in"
          }`}
        >
          {filteredPromotions.length === 0 ? (
            <div className="col-span-full text-center text-xl text-gray-500 p-4">
              <p>Không có khuyến mãi nào ở thời điểm này!</p>
            </div>
          ) : (
            filteredPromotions.map((promo) => (
              <div
                key={promo.id}
                className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition hover:bg-gray-100"
              >
                <div className="w-32 h-32 overflow-hidden rounded-lg">
                  <img
                    src={promo.image_url}
                    alt={promo.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mt-4">{promo.name}</h3>
                <p className="text-gray-600 mt-2">{promo.description}</p>
                <p className="text-green-500 font-bold mt-4">
                  {promo.discount}% Giảm
                </p>
                <button className="mt-4 block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-1/3">
                  Xem Chi Tiết
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Promotion;
