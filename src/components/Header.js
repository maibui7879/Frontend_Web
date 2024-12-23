import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { FaHome, FaUtensils, FaNewspaper, FaConciergeBell, FaTag, FaPhoneAlt, FaCog } from "react-icons/fa";

const Header = ({ isAdmin, toggleAdminMode, onViewChange }) => {
  const [adminState, setAdminState] = useState(isAdmin);
  const navigate = useNavigate();

  useEffect(() => {
    setAdminState(isAdmin);
  }, [isAdmin]);

  const handleAdminModeToggle = () => {
    toggleAdminMode(false);
    localStorage.removeItem("loggedIn");
    navigate("/");
  };

  return (
    <header className="relative bg-[url('https://sakos.vn/wp-content/uploads/2024/07/1658123252-cover_pho-1.jpg')] bg-cover bg-center pt-4 shadow-md z-1 w-full">
      <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>

      <div className="relative z-10 container w-full">
        <div className="flex items-center w-1/2 h-full mx-4">
          <div className="flex items-center w-full">
            <img src="logo.png" alt="Restaurant Logo" className="h-12 w-12 mr-4" />
            <h1 className="text-xl font-bold font-fancy-menu text-white"><i>Chèo Bẻo Restaurant</i></h1>
          </div>
        </div>

        <div className="relative mt-4 flex w-full mx-4">
          <nav className="flex flex-row w-full text-white mx-4">
            {adminState ? (
              <button
                onClick={handleAdminModeToggle}
                className="flex-1 py-4 px-4 text-center font-semibold transition duration-300 flex bg-opacity-50 hover:text-gray-200  w-1/4"
              >
                <FaCog className="inline-block mr-2 rounded" />
                Chuyển về chế độ thường
              </button>
            ) : (
              <>
                {[{
                  to: "/",
                  label: "Trang Chủ",
                  icon: <FaHome className="inline-block mr-2" />
                }, {
                  to: "/thucdon",
                  label: "Thực Đơn",
                  icon: <FaUtensils className="inline-block mr-2" />
                }, {
                  to: "/news",
                  label: "Tin Tức",
                  icon: <FaNewspaper className="inline-block mr-2" />
                }, {
                  to: "/reserve",
                  label: "Đặt bàn",
                  icon: <FaConciergeBell className="inline-block mr-2" />
                },  {
                  to: "/feedback",
                  label: "CSKH",
                  icon: <FaPhoneAlt className="inline-block mr-2" />
                }].map((item, index, array) => (
                  <NavLink
                    key={index}
                    to={item.to}
                    className={({ isActive }) => {
                      let baseClasses = "flex-1 py-4 px-4 text-center font-semibold transition duration-300 flex items-center justify-center";
                      let hoverClasses = "hover:bg-gray-50 hover:text-black hover:border-white";
                      let activeClasses = isActive ? "bg-white text-black border-white" : "";
                      let roundedClasses = "";

                      if (index === 0) {
                        roundedClasses = "rounded-l-lg";
                      } else if (index === array.length - 1) {
                        roundedClasses = "rounded-r-lg";
                      }

                      return `${baseClasses} ${hoverClasses} ${activeClasses} ${roundedClasses}`;
                    }}
                  >
                    {item.icon}
                    {item.label}
                  </NavLink>
                ))}
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
