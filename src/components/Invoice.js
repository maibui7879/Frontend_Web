import React, { useState, useEffect } from "react";
import axios from "axios";
import "aos/dist/aos.css";
import AOS from "aos";

const Invoice = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderItems, setOrderItems] = useState([]); // Lưu trữ chi tiết đơn hàng
  const [loadingItems, setLoadingItems] = useState(false); // Trạng thái tải dữ liệu chi tiết
  const [menuItems, setMenuItems] = useState([]); // Lưu trữ thông tin sản phẩm
  const [loadingMenu, setLoadingMenu] = useState(true); // Trạng thái tải thông tin sản phẩm
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null); // Quản lý hóa đơn đã chọn

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/orders");
        setInvoices(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching invoices:", error);
        alert("Failed to fetch invoice data. Please try again later.");
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get("http://localhost:3001/menu");
        setMenuItems(response.data); // Lưu thông tin menu
        setLoadingMenu(false);
      } catch (error) {
        console.error("Error fetching menu items:", error);
        setLoadingMenu(false);
      }
    };

    fetchMenuItems();
  }, []);

  const handleDelete = async (invoiceId) => {
    const confirmed = window.confirm("Bạn có chắc chắn muốn xóa hóa đơn này?");
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:3001/api/orders/${invoiceId}`);
        setInvoices(invoices.filter(invoice => invoice.id !== invoiceId));
      } catch (error) {
        console.error("Error deleting invoice:", error);
        alert("Failed to delete invoice. Please try again later.");
      }
    } else {
      console.log("Xóa hóa đơn bị hủy.");
    }
  };

  const toggleOrderDetails = async (invoiceId) => {
    console.log("Bấm vào hóa đơn với ID:", invoiceId);

    try {
      setLoadingItems(true);
      const response = await axios.get(`http://localhost:3001/api/order-items/${invoiceId}`);
      console.log("Dữ liệu order item trả về:", response.data);
      setOrderItems([response.data]);
      setLoadingItems(false);
      setSelectedInvoiceId(invoiceId);
    } catch (error) {
      console.error("Lỗi khi gọi API order items:", error);
      setLoadingItems(false);
    }
  };

  const getProductNameById = (menuId) => {
    const product = menuItems.find(item => item.id === menuId);
    return product ? product.name : "Sản phẩm không tồn tại";
  };

  return (
    <div className="bg-gray-200 min-h-screen flex justify-center items-center ">
    <div className="py-8 bg-white w-full mx-8 shadow-lg">
      <h3 className="font-semibold text-2xl mb-4 text-black border-b border-gray-200" data-aos="fade-up">
        <p className="mx-8">Danh Sách Hóa Đơn</p>
      </h3>

      {loading ? (
        <p className="text-black" data-aos="fade-up">
          Đang tải dữ liệu...
        </p>
      ) : (
        <div className="overflow-x-auto max-h-96 mx-4" data-aos="fade-up">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead className="bg-purple-400 sticky top-0 z-10">
              <tr className="bg-purple-400 text-white">
                <th className="py-4 px-4 border border-gray-300">ID</th>
                <th className="py-4 px-4 border border-gray-300">Khách Hàng</th>
                <th className="py-4 px-4 border border-gray-300">Ngày Mua</th>
                <th className="py-4 px-4 border border-gray-300">Tổng Tiền</th>
                <th className="py-4 px-4 border border-gray-300">Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <React.Fragment key={invoice.id}>
                  <tr
                    className="text-center hover:bg-gray-100 cursor-pointer"
                    onClick={() => toggleOrderDetails(invoice.id)}
                  >
                    <td className="py-1 px-4 border border-gray-300">{invoice.id}</td>
                    <td className="py-1 px-4 border border-gray-300">{invoice.customer_name}</td>
                    <td className="py-1 px-4 border border-gray-300">{invoice.created_at.slice(0, 10)}</td>
                    <td className="py-1 px-4 border border-gray-300">{invoice.total_price}</td>
                    <td className="py-1 px-4 border border-gray-300">
                      {invoice.trangThai}
                      <button
                        className="text-red-500 ml-2 mx-auto"
                        onClick={(e) => {
                          e.stopPropagation(); 
                          handleDelete(invoice.id);
                        }}
                      >
                        <p className="mx-auto">Xóa</p>
                      </button>
                    </td>
                  </tr>
                  {selectedInvoiceId === invoice.id && (
                    <tr>
                      <td colSpan="5">
                        <div
                          className="relative my-4 p-4 bg-white rounded-lg shadow-lg"
                          data-aos="fade-down"
                          data-aos-duration="800"
                          data-aos-easing="ease-in-out"
                        >
                          <div className="absolute top-2 right-2">
                            <button
                              onClick={() => setSelectedInvoiceId(null)}
                              className="text-gray-500 hover:text-gray-700 font-bold"
                            >
                              X
                            </button>
                          </div>
                          <h4 className="font-semibold text-lg mb-4">Chi Tiết Đơn Hàng:</h4>
                          {loadingItems ? (
                            <p className="text-center">Đang tải thông tin chi tiết...</p>
                          ) : (
                            <table className="min-w-full table-auto border-collapse border border-gray-300 mt-2">
                              <thead style={{ backgroundColor: "rgba(0, 0, 255, 0.3)" }}>
                                <tr>
                                  <th className="py-2 px-4 border border-gray-300 text-left">Sản Phẩm</th>
                                  <th className="py-2 px-4 border border-gray-300 text-left">Số Lượng</th>
                                </tr>
                              </thead>
                              <tbody>
                                {orderItems.map((item) => (
                                  <tr key={item.id}>
                                    <td className="py-2 px-4 border border-gray-300">
                                      {getProductNameById(item.menu_id)}
                                    </td>
                                    <td className="py-2 px-4 border border-gray-300">{item.quantity}</td>
                                  </tr>
                                ))}
                              </tbody>
                              
                            </table>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
          
        </div>
      )}
    </div>
    </div>
  ); 
};

export default Invoice;
