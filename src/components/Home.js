import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Home = ({ onViewChange }) => {
  const [taiKhoan, setTaiKhoan] = useState("Người dùng");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    const storedTaiKhoan = localStorage.getItem("taiKhoan");
    if (storedTaiKhoan) {
      setTaiKhoan(storedTaiKhoan);
    }
    setLoading(false);
  }, []);

  if (loading) return <p>Đang tải...</p>;

  const buttonData = [
    {
      title: "Nhân Sự",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCQk9N1vE3je37R0LUfD25FWH8RkyV27hFug&s",
      view: "employee",
    },
    {
      title: "Hóa Đơn",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTka-Ew-txw4vVSN7iCYyuu9SZiPyrrm2CqQw&s",
      view: "invoice",
    },
    {
      title: "Doanh Thu",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOcvYcd7aOD2vlpXPID1jALAUmScHGwGn9Jw&s",
      view: "revenue",
    },
    {
      title: "Menu",
      image: "https://tamanhduong.vn/public/uploads/0d150d3243b9d50a9969c65770355c26/images/kich-thuoc-menu-15.jpg",
      view: "menuEditor",
    },
    {
      title: "Kho hàng",
      image: "https://tamanhduong.vn/public/uploads/0d150d3243b9d50a9969c65770355c26/images/kich-thuoc-menu-15.jpg",
      view: "inventory",
    },
  ];

  return (
    <div className="bg-gray-200 min-h-screen flex justify-center items-center py-8">
      <div className="bg-white text-center  shadow-lg w-full max-w-5xl pb-16">
        <h1 className="text-4xl font-bold mb-6 font-fancy px-8 pt-8">
          Chào mừng, <b className="text-blue-500">{taiKhoan}</b>!
        </h1>
        <p className="text-lg">Chọn một chức năng từ menu để bắt đầu quản lý nhà hàng.</p>
        <div className="flex flex-col gap-6 mt-4 border-t border-black border-2xl pt-4">
          {buttonData.map((button, index) => {
            if (index % 2 === 0) {
              return (
                <div key={index} className="flex gap-4 px-8">
                  <div className="w-1/2">
                    <button
                      onClick={() => onViewChange(button.view)}
                      className="flex items-center py-3 px-4 bg-cover bg-center text-white rounded-lg border-2 border-gray-300 relative overflow-hidden transition-all duration-300"
                      style={{
                        backgroundImage: `url(${button.image})`,
                        height: "250px",
                        transition: "transform 0.3s ease-in-out",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                      data-aos="fade-up"
                    >
                      <span className="absolute bottom-0 left-0 bg-black bg-opacity-80 p-2 text-left w-full rounded-b-lg">
                        <b className="ml-2">{button.title}</b>
                      </span>
                    </button>
                  </div>
                  {buttonData[index + 1] && (
                    <div className="w-1/2">
                      <button
                        onClick={() => onViewChange(buttonData[index + 1].view)}
                        className="flex items-center py-3 px-4 bg-cover bg-center text-white rounded-lg border-2 border-gray-300 relative overflow-hidden transition-all duration-300"
                        style={{
                          backgroundImage: `url(${buttonData[index + 1].image})`,
                          height: "250px",
                          transition: "transform 0.3s ease-in-out",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                        data-aos="fade-up"
                      >
                        <span className="absolute bottom-0 left-0 bg-black bg-opacity-80 p-2 text-left w-full rounded-b-lg">
                          <b className="ml-2">{buttonData[index + 1].title}</b>
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
