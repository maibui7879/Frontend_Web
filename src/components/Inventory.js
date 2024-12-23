import React, { useState, useEffect } from "react";
import axios from "axios";
import "aos/dist/aos.css";
import AOS from "aos";

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Tất Cả");
  const [expiredItems, setExpiredItems] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out", once: true });
  }, []);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/inventory");
        const formattedItems = response.data.map((item) => ({
          ...item,
          han_su_dung: item.han_su_dung ? item.han_su_dung.slice(0, 10) : null,
        }));
        setInventory(formattedItems);
      } catch (error) {
        console.error("Error fetching inventory:", error);
        alert("Không thể lấy dữ liệu hàng tồn kho. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };
    fetchInventory();
  }, []);

  useEffect(() => {
    const now = new Date().toISOString().slice(0, 10);
    setExpiredItems(
      inventory.filter((item) => item.han_su_dung && item.han_su_dung < now)
    );

    // Kiểm tra và xóa sản phẩm có số lượng = 0
    inventory.forEach(async (item) => {
      if (item.so_luong === 0) {
        try {
          await axios.delete(`http://localhost:3001/api/inventory/${item.id}`);
          setInventory((prev) => prev.filter((i) => i.id !== item.id));
        } catch (error) {
          console.error("Error deleting item with zero quantity:", error);
        }
      }
    });
  }, [inventory]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingItem((prev) => ({ ...prev, [name]: value || null }));
  };

  const handleModalClose = () => setEditingItem(null);

  const handleSave = async (item) => {
    try {
      if (item.id) {
        await axios.put(`http://localhost:3001/api/inventory/${item.id}`, item);
        setInventory((prev) =>
          prev.map((existing) =>
            existing.id === item.id ? { ...existing, ...item } : existing
          )
        );
      } else {
        const response = await axios.post("http://localhost:3001/api/inventory", item);
        setInventory((prev) => [...prev, { ...item, id: response.data.id }]);
      }
      handleModalClose();
    } catch (error) {
      console.error("Error saving item:", error);
      alert("Lỗi khi lưu thông tin sản phẩm. Vui lòng thử lại.");
    }
  };

  const handleDelete = async (itemId) => {
    try {
      await axios.delete(`http://localhost:3001/api/inventory/${itemId}`);
      setInventory((prev) => prev.filter((item) => item.id !== itemId));
      handleModalClose();
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Không thể xóa sản phẩm. Vui lòng thử lại.");
    }
  };

  const filteredInventory =
    selectedCategory === "Tất Cả"
      ? inventory
      : inventory.filter((item) => {
          const categoryMap = {
            "Thực Phẩm": "thuc_pham",
            "Đồ Gia Dụng": "do_gia_dung",
            "Khác": "khac",
          };
          return item.phan_loai === categoryMap[selectedCategory];
        });

  const categoryOptions = [
    { label: "Thực Phẩm", value: "thuc_pham" },
    { label: "Đồ Gia Dụng", value: "do_gia_dung" },
    { label: "Khác", value: "khac" },
  ];

  const renderTableRows = (items) =>
    items.map((item) => {
      const isExpired = expiredItems.some((expired) => expired.id === item.id);
      return (
        <tr
          key={item.id}
          className={`text-center hover:bg-gray-100 cursor-pointer ${
            isExpired ? "bg-red-100 text-red-500" : ""
          }`}
          onClick={() => setEditingItem(item)}
        >
          <td className="py-2 px-4 border border-gray-300">{item.id}</td>
          <td className="py-2 px-4 border border-gray-300">{item.ten}</td>
          <td className="py-2 px-4 border border-gray-300">{item.so_luong}</td>
          <td className="py-2 px-4 border border-gray-300">{item.don_gia}</td>
          <td className="py-2 px-4 border border-gray-300">
            {item.so_luong * item.don_gia || 0}
          </td>
          <td className="py-2 px-4 border border-gray-300">{item.nha_cung_ung}</td>
          <td className="py-2 px-4 border border-gray-300">
            {categoryOptions.find((opt) => opt.value === item.phan_loai)?.label ||
              "Không xác định"}
          </td>
          <td className="py-2 px-4 border border-gray-300">
            {item.han_su_dung || "Không có"}
          </td>
        </tr>
      );
    });

  const renderModal = () => (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10"
      onClick={(e) => e.target === e.currentTarget && handleModalClose()}
    >
      <div className="bg-white p-8 rounded-lg w-[60%]" onClick={(e) => e.stopPropagation()}>
        <h3 className="font-semibold text-2xl mb-4">
          {editingItem.id ? "Sửa Thông Tin Sản Phẩm" : "Thêm Sản Phẩm"}
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {[{ label: "Tên Sản Phẩm", name: "ten", type: "text" },
            { label: "Số Lượng", name: "so_luong", type: "number" },
            { label: "Đơn Giá", name: "don_gia", type: "number" },
            { label: "Nhà Cung Cấp", name: "nha_cung_ung", type: "text" }].map(({ label, name, type }) => (
            <div key={name}>
              <label className="block text-sm font-medium text-black px-2">
                <b>{label}</b>
              </label>
              <input
                type={type}
                name={name}
                value={editingItem[name] || ""}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          ))}
          <div>
            <label className="block text-sm font-medium text-black px-2">
              <b>Phân Loại</b>
            </label>
            <select
              name="phan_loai"
              value={editingItem.phan_loai || ""}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            >
              <option value="">Chọn loại</option>
              {categoryOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-black px-2">
              <b>Hạn Sử Dụng</b>
            </label>
            <input
              type="date"
              name="han_su_dung"
              value={editingItem.han_su_dung || ""}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-between space-x-4">
          <button
            onClick={() => handleSave(editingItem)}
            className="bg-blue-500 text-white py-2 px-4  w-1/2 mx-auto"
          >
            <b className="mx-auto">Lưu</b>
          </button>
          {editingItem.id && (
            <button
              onClick={() => handleDelete(editingItem.id)}
              className="bg-red-500 text-white py-2 px-4 w-1/2"
            >
              <b className="mx-auto">Xóa</b>
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-200 min-h-screen flex justify-center items-center py-8">
      <div className="py-8 bg-white mx-8 shadow-lg ">
        <h3 className="font-semibold text-2xl mb-4 text-black border-b border-gray-200" data-aos="fade-up">
          <p className="mx-8">Kho Hàng</p>
        </h3>
        <div className="mb-6 mx-4">
          <select
            data-aos="fade-up"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 rounded-md p-2"
          >
            <option value="Tất Cả">Tất Cả</option>
            {categoryOptions.map((opt) => (
              <option key={opt.label} value={opt.label}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        {loading ? (
          <p className="text-black mx-4" data-aos="fade-up">
            Đang tải dữ liệu...
          </p>
        ) : filteredInventory.length > 0 ? (
          <div className="overflow-x-auto max-h-96 mx-4" data-aos="fade-up">
            <table className="min-w-full table-auto border-collapse border border-gray-300">
              <thead className="bg-gray-200 sticky top-0 z-10">
                <tr className="bg-gray-200">
                  {["ID", "Tên Sản Phẩm", "Số Lượng", "Đơn Giá", "Tổng Giá", "Nhà Cung Cấp", "Phân Loại", "Hạn Sử Dụng"].map(
                    (header) => (
                      <th key={header} className="py-2 px-4 border border-gray-300">
                        {header}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>{renderTableRows(filteredInventory)}</tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500">Không có sản phẩm nào trong danh mục này.</p>
        )}
        <div className="flex justify-center mt-4" data-aos="zoom-in">
          <button
            onClick={() =>
              setEditingItem({
                id: null,
                ten: "",
                so_luong: "",
                don_gia: "",
                nha_cung_ung: "",
                phan_loai: "",
                han_su_dung: null,
              })
            }
            className="bg-green-500 text-white py-2 px-4 rounded-md w-1/6"
          >
            <p className="mx-auto">Thêm Sản Phẩm</p>
          </button>
        </div>
        {editingItem && renderModal()}
      </div>
    </div>
  );
};

export default Inventory;
