import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Footer = ({ toggleAdminMode, isAdmin }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3001/api/auth/login", credentials);
      
      if (response.status === 200) {
        const { username } = credentials;
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("taiKhoan", username);
        setModalOpen(false); // Close modal
        toggleAdminMode(true); // Immediately update the admin mode state in parent
        navigate("/manager");
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message || "Sai tài khoản hoặc mật khẩu.");
      } else {
        setErrorMessage("Không thể kết nối đến máy chủ.");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("taiKhoan");
    setModalOpen(false); 
    toggleAdminMode(false); 
    navigate("/"); 
  };

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto text-center lg:text-left px-4">
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <div className="mb-4 lg:mb-0">
            <img src="logo.png" alt="Chèo Bẻo Logo" className="w-32 mx-auto" />
            <b className="italic text-xl mt-2 text-center">Nhà hàng Chèo Bẻo</b>
            <p className="italic text-xl mt-2 text-center">"Ê con Bẻo"</p>
          </div>

          <div className="mb-4 lg:mb-0">
            <h4 className="text-lg font-semibold">Thông Tin Doanh Nghiệp</h4>
            <p>Chèo Bẻo - Nhà Hàng & Dịch Vụ Ăn Uống</p>
            <p>Địa chỉ: Đoán xem</p>
            <p>Chi nhánh 1: Đém xoan</p>
            <p>Chi nhánh 2: buhbuhlmaoxd</p>
          </div>

          <div className="mb-4 lg:mb-0">
            <h4 className="text-lg font-semibold">Liên Hệ</h4>
            <p>Điện thoại: +84 329 556 941</p>
            <p>Email: maibui7879@gmail.com</p>
            <p>
              Website:
              <a href="http://localhost:3000" className="text-blue-400">
                www.cheobeo.vn
              </a>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          {!isAdmin ? (
            <button
              onClick={() => setModalOpen(true)}
              className="text-blue-400 hover:underline mx-4"
            >
              Vào Chế độ Quản lí
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="text-blue-400 hover:underline"
            >
              Thoát Chế độ Quản lí
            </button>
          )}
        </div>

        <div className="mt-6 text-center">
          <p>&copy; 2024 Chèo Bẻo. All rights reserved.</p>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <img src="logo.png" alt="Chèo Bẻo Logo" className="w-16 mx-auto text-black" />
            <h2 className="text-2xl font-semibold my-8 text-center font-fancy">
              <b><i>Đăng Nhập</i></b>
            </h2>
            <div>
              <input
                type="text"
                placeholder="Tên đăng nhập"
                className="w-full border border-gray-300 rounded p-2 mb-3 text-black"
                value={credentials.username}
                onChange={(e) =>
                  setCredentials({ ...credentials, username: e.target.value })
                }
              />
              <input
                type="password"
                placeholder="Mật khẩu"
                className="w-full border border-gray-300 rounded p-2 mb-3 text-black"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
              />
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}
              <button
                onClick={handleLogin}
                className="w-full py-2 mt-4 bg-blue-500 text-white rounded"
              >
                <p className="mx-auto">Đăng Nhập</p>
              </button>
              <button
                onClick={() => setModalOpen(false)}
                className="w-full py-2 mt-4 bg-gray-300 text-black rounded"
              >
                <p className="mx-auto">Đóng</p>
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
