import React, { useState, useEffect } from "react";
import axios from "axios";
import OrderForm from "./OrderForm";
import { FaUtensils, FaCocktail, FaHamburger, FaCoffee, FaWineGlassAlt } from "react-icons/fa";
import "./MenuList.css";
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles

const MenuList = ({ searchQuery }) => {
  const [menu, setMenu] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Tất Cả");
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSlide, setCurrentSlide] = useState(0);
  const itemsPerPage = 6;

  useEffect(() => {
    axios
      .get("http://localhost:3001/menu")
      .then((response) => setMenu(response.data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    window.scrollTo(0, 10);
  }, [currentPage]);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); // Initialize AOS animation
  }, []);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % 3);
    }, 3000);

    return () => clearInterval(slideInterval);
  }, []);

  const filteredMenu = menu.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "Tất Cả" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCategoryChange = (category) => {
    if (category === selectedCategory) return;

    setIsAnimating(true);
    setTimeout(() => {
      setSelectedCategory(category);
      setCurrentPage(1);
      setIsAnimating(false);
    }, 300);
  };

  const handleOrderClick = (item) => {
    setSelectedMenuItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMenuItem(null);
  };

  const categoryTitle = selectedCategory === "Tất Cả" ? "Thực Đơn" : selectedCategory;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMenu.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredMenu.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="relative bg-cover bg-center bg-[url('https://i.pinimg.com/736x/9f/20/f0/9f20f045c6a90b7d2dd0c6a6f4efa28f.jpg')] pb-4 min-h-screen flex flex-col items-center justify-start bg-yellow-100">
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>

      {/* Slider */}
      <div className="relative w-full overflow-hidden mb-8 shadow-lg">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {menu.slice(0, 3).map((item, index) => (
            <div
              key={index}
              className="relative min-w-full w-max flex items-center justify-center px-4 py-8 h-256"
              style={{
                backgroundImage: `url(${item.image_url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>
              <div className="relative bg-white bg-opacity-90 rounded-lg shadow-lg p-4 text-center z-10 shadow-inner">
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-32 h-32 object-cover mx-auto mb-4 rounded-full"
                />
                <h3 className="relative text-xl font-semibold mb-2">{item.name}</h3>
                <p className="relative text-gray-500 mb-2">{item.description}</p>
                <p className="relative text-green-600 font-bold">
                  {Number(item.price).toLocaleString("vi-VN", { minimumFractionDigits: 0 })} VND
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
<div className="border-b border-white w-full px-32 py-4">
      <h2 className="relative text-4xl font-fancy-menu text-center mb-2 z-10 mt-8 " data-aos="fade-up">
        <i>
          <b>{categoryTitle}</b>
        </i>
      </h2>
      </div>
      {/* Category buttons */}
      <div className="relative w-full rounded-lg p-4">
        <div className="relative flex justify-center mb-4 z-10 w-full p-2 rounded-md">
          {[{ category: "Tất Cả", icon: <FaUtensils /> },
            { category: "Appetizer", icon: <FaCocktail /> },
            { category: "Main Course", icon: <FaHamburger /> },
            { category: "Soup", icon: <FaCoffee /> },
            { category: "Beverage", icon: <FaWineGlassAlt /> },
          ].map(({ category, icon }) => (
            <button
              key={category}
              className={`flex items-center mx-4 py-2 px-4 border-2 border-white rounded-md transition-all text-gray-200 ${
                selectedCategory === category
                  ? "border-gray-200 bg-gray-200 text-gray-900 font-bold"
                  : "hover:bg-gray-300 hover:text-gray-900"
              }`}
              onClick={() => handleCategoryChange(category)}
            >
              {icon}
              <span className="ml-2">{category}</span>
            </button>
          ))}
        </div>

        {/* Menu items */}
        <div
          className={`relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-transform duration-500 ease-in-out w-full mx-auto ${
            isAnimating ? "opacity-0" : "opacity-100"
          } z-10 `}
        >
          {currentItems.map((item) => (
            <div
              key={item.id}
              className="relative bg-cover bg-center p-4 rounded-lg shadow hover:shadow-lg transition hover:bg-gray-100"
              style={{
                backgroundImage: `url('https://png.pngtree.com/thumb_back/fh260/background/20231230/pngtree-illustrated-vector-background-restaurant-menu-design-with-paper-texture-food-and-image_13914730.png')`,
              }} // Add background for each menu item
              data-aos="fade-up"
            >
              <div className="absolute inset-0 bg-white bg-opacity-60"></div> {/* Overlay for each menu item */}
              <div className="relative text-white z-10">
                <div className="relative w-32 h-32 overflow-hidden rounded-lg text-left">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="relative text-xl font-semibold mt-4 text-left">{item.name}</h3>
                <p className="relative text-gray-200 mt-2 text-left">{item.description}</p>
                <p className="relative text-green-500 font-bold mt-4 text-left">
                  {Number(item.price).toLocaleString("vi-VN", { minimumFractionDigits: 0 })} VND
                </p>
                <button
                  onClick={() => handleOrderClick(item)}
                  className="mt-4 block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Đặt Ngay
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-6">
          {/* Previous Button */}
          {currentPage > 1 && (
            <button
              onClick={handlePrevPage}
              className="mx-2 px-4 py-4 bg-transparent border-2 border-white text-white rounded-full hover:bg-gray-500"
              style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              &lt;
            </button>
          )}

          {/* Page Number Buttons */}
          {Array.from({ length: Math.ceil(filteredMenu.length / itemsPerPage) }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`mx-2 px-4 py-4 bg-transparent border-2 border-white text-white rounded-full hover:bg-transparent ${
                currentPage === index + 1 ? "bg-gray-500 text-black" : ""
              }`}
              style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              {index + 1}
            </button>
          ))}

          {/* Next Button */}
          {currentPage < Math.ceil(filteredMenu.length / itemsPerPage) && (
            <button
              onClick={handleNextPage}
              className="mx-2 px-4 py-4 bg-transparent border-2 border-white text-white rounded-full hover:bg-transparent"
              style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              &gt;
            </button>
          )}
        </div>
      </div>

      {isModalOpen && selectedMenuItem && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50"
        >
          <div className="relative bg-white rounded-lg shadow-lg p-4 w-full max-w-lg z-60">
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
              aria-label="Đóng"
            >
              &times;
            </button>
            <OrderForm closeModal={closeModal} menuItem={selectedMenuItem} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuList;
