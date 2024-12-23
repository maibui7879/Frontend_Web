import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import "aos/dist/aos.css";
import AOS from "aos";

const MenuEditor = () => {
  const [menu, setMenu] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: "",
    image_url: "",
    category: "Tất Cả", // Default category value
  });

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3001/menu")
      .then((response) => setMenu(response.data))
      .catch((error) => console.error("Error fetching menu:", error));
  }, []);

  const handleEditClick = (item) => {
    setSelectedMenuItem(item);
    setNewItem(item); // Pre-populate fields for editing
    setIsEditModalOpen(true);
  };

  const handleAddClick = () => {
    setIsAddModalOpen(true);
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/menu/${id}`);
      alert("Menu item deleted!");
      setMenu(menu.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting menu item:", error);
      alert("Error deleting menu item.");
    }
  };

  const closeModal = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedMenuItem(null);
    setNewItem({
      name: "",
      description: "",
      price: "",
      image_url: "",
      category: "Tất Cả",
    });
  };

  const handleSave = async () => {
    if (!newItem.name || !newItem.price || !newItem.description || !newItem.image_url || !newItem.category) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    try {
      if (selectedMenuItem) {
        // Edit existing item
        await axios.put(`http://localhost:3001/menu/${selectedMenuItem.id}`, newItem);
        alert("Menu item updated!");
      } else {
        // Add new item
        await axios.post("http://localhost:3001/menu", newItem);
        alert("Menu item added!");
      }

      closeModal();
      // Refresh menu after adding or editing
      axios.get("http://localhost:3001/menu").then((response) => setMenu(response.data));
    } catch (error) {
      console.error("Error saving menu item:", error);
      alert("Error saving menu item.");
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen flex justify-center items-center py-8">
    <div className="py-8 bg-white shadow-lg mx-8">
      <h3 className="font-semibold text-2xl mb-4 text-black border-b border-gray-200" data-aos="fade-up">
        <p className="mx-8">Chỉnh Sửa Món Ăn</p>
      </h3>
    <div className="container px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {menu.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105"
            data-aos="fade-up"
            style={{ backgroundImage: `url(https://png.pngtree.com/thumb_back/fh260/background/20231230/pngtree-illustrated-vector-background-restaurant-menu-design-with-paper-texture-food-and-image_13914730.png)`, backgroundSize: "cover", backgroundPosition: "center" }}
          >
            <div className="absolute inset-0 bg-white bg-opacity-50 rounded-lg"></div>
            <div className="relative w-32 h-32 overflow-hidden rounded-lg mb-4">
              <img
                src={item.image_url}
                alt={item.name}
                className="relative w-full h-full object-cover"
              />
            </div>
            <h3 className="relative text-xl font-semibold mb-2 text-gray-700">{item.name}</h3>
            <p className="relative text-gray-50 mb-4">{item.description}</p>
            <p className="relative text-green-500 font-bold text-lg">
              {item.price.toLocaleString()} VND
            </p>
            <div className="relative flex justify-between mt-4">
              <button
                onClick={() => handleEditClick(item)}
                className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 flex items-center mr-2"
              >
                <FaEdit className="inline mr-2" />
                Sửa
              </button>
              <button
                onClick={() => handleDeleteClick(item.id)}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 flex items-center"
              >
                <FaTrash className="inline mr-2" />
                Xóa
              </button>
            </div>
          </div>
        ))}
        <div
          onClick={handleAddClick}
          className="flex items-center flex flex-col justify-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105 cursor-pointer"
          style={{ backgroundImage: `url(https://png.pngtree.com/thumb_back/fh260/background/20231230/pngtree-illustrated-vector-background-restaurant-menu-design-with-paper-texture-food-and-image_13914730.png)`, backgroundSize: "cover", backgroundPosition: "center" }}
        >
          <div className="absolute inset-0 bg-white bg-opacity-50 rounded-lg hover:bg-opacity-20"></div>
          <div className="relative w-32 h-32 flex items-center justify-center bg-white hover:bg-gray-200 rounded-full">
            <FaPlus className="text-3xl text-gray-700" />
          </div>
          <h3 className="relative mt-4 text-xl font-semibold text-gray-700 hover:text-gray-500">Thêm món ăn</h3>
        </div>
      </div>

      {/* Add/Edit Item Modal */}
      {(isAddModalOpen || isEditModalOpen) && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={handleBackdropClick}
        >
          <div
            className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-lg overflow-y-auto"
            style={{ height: "90vh" }}
            data-aos="fade-in"
          >
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">
              {isEditModalOpen ? "Chỉnh sửa món ăn" : "Thêm món ăn"}
            </h3>
            <div className="w-full mb-4">
              <label htmlFor="name" className="block font-medium text-gray-700"><b>Tên món:</b></label>
              <input
                type="text"
                placeholder="VD: Phở"
                id="name"
                name="name"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="w-full mb-4">
              <label htmlFor="price" className="block font-medium text-gray-700"><b>Giá:</b></label>
              <input
                type="number"
                placeholder="0"
                id="price"
                name="price"
                value={newItem.price}
                onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="w-full mb-4">
              <label htmlFor="description" className="block font-medium text-gray-700"><b>Mô tả:</b></label>
              <textarea
                id="description"
                placeholder="VD: Cay cay ngon ngon, giòn ngon hetcuu"
                name="description"
                value={newItem.description}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="w-full mb-4">
              <label htmlFor="image_url" className="block font-medium text-gray-700"><b>URL ảnh:</b></label>
              <input
                type="text"
                id="image_url"
                placeholder="abcxyz.com"
                name="image_url"
                value={newItem.image_url}
                onChange={(e) => setNewItem({ ...newItem, image_url: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="w-full mb-4">
              <label htmlFor="category" className="block font-medium text-gray-700"><b>Danh mục:</b></label>
              <select
                id="category"
                name="category"
                value={newItem.category}
                onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">Tất Cả</option>
                <option value="Appetizer">Khai Vị</option>
                <option value="Main Course">Món Chính</option>
                <option value="Soup">Súp</option>
                <option value="Beverage">Đồ Uống</option>
              </select>
            </div>

            <div className="flex justify-end mt-4">
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600"
              >
                <p className="mx-auto">{isEditModalOpen ? "Lưu thay đổi" : "Thêm món"}</p>
              </button>
              <button
                onClick={closeModal}
                className="bg-red-500 text-white py-2 px-6 rounded ml-4 hover:bg-gray-600"
              >
                <p className="mx-auto">Đóng</p> 
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
    </div>
  );
  
};

export default MenuEditor;
