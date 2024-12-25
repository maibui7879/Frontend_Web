import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight} from "react-icons/fa"; // Biểu tượng dao dĩa
import { useNavigate } from "react-router-dom"; // Chuyển hướng
import AOS from "aos"; // Import AOS
import "aos/dist/aos.css"; // Import style của AOS
import OrderForm from "./OrderForm"; // Import modal OrderForm
import "./HomePage.css";

const HomePage = () => {
  const [menu, setMenu] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null); // State để lưu món ăn đã chọn
  const navigate = useNavigate();

  useEffect(() => {
    // Khởi tạo AOS sau khi component đã render
    AOS.init({
      duration: 1000, // Thời gian hiệu ứng
      once: true, // Chỉ chạy một lần khi cuộn vào phần tử
    });

    // Lấy dữ liệu menu
    axios
      .get("http://localhost:3001/menu")
      .then((response) => {
        setMenu(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching menu data", error);
        setIsLoading(false);
      });
  }, []);

  const topSellingItems = menu.slice(0, 3);

  const ArrowLeft = ({ onClick }) => (
    <div className="custom-arrow-left" onClick={onClick}>
      <FaArrowLeft />
    </div>
  );

  const ArrowRight = ({ onClick }) => (
    <div className="custom-arrow-right" onClick={onClick}>
      <FaArrowRight />
    </div>
  );

  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: <ArrowRight />,
    prevArrow: <ArrowLeft />,
  };
  const reviews = [
    {
      id: 1,
      name: "Cn Mel Deep Try",
      comment: "Meo.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSMlVx1p_r0oRhXKSqxAamwfMKLJz8BrttJg&s", // URL ảnh khách hàng
    },
    {
      id: 2,
      name: "King Baldwin",
      comment: "Skibidi Toilet",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpoSZE1wm7Rn2DZb66arm15P2XPd9mpyCYjg&s",
    },
    {
      id: 3,
      name: "Saladin",
      comment: "Toilet Skibidi.",
      image: "https://i.pinimg.com/564x/b9/8b/90/b98b90838617ccb918a2404a2e5e98e0.jpg",
    },
  ];

  const openModal = (menuItem) => {
    setSelectedMenuItem(menuItem); // Lưu món ăn đã chọn vào state
    setIsModalOpen(true); // Mở modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Đóng modal
  };

  return (
    <div className="homepage mb-none py-none">
      {/* Banner Slider */}
      <div className="banner-slider mb-none mt-2"               
        data-aos="fade-up"
        >
        <Slider {...sliderSettings}>
          <div className="banner-slide">
            <img
              src="banner1.png"
              alt="Banner 1"
              className="w-full h-90 object-cover"
            />
          </div>
          <div className="banner-slide">
            <img
              src="banner2.png"
              alt="Banner 2"
              className="w-full h-90 object-cover"
            />
          </div>
        </Slider>
      </div>

{/* Menu Section */}
<div
  className="menu-section bg-cover bg-center bg-no-repeat py-10 rounded-lg px-10 mx-auto relative"
  style={{ backgroundImage: `url('https://png.pngtree.com/thumb_back/fh260/background/20231230/pngtree-illustrated-vector-background-restaurant-menu-design-with-paper-texture-food-and-image_13914730.png')` }} // Thay bằng đường dẫn hình nền của bạn
  
>
  {/* Lớp phủ */}
  <div className="absolute inset-0 bg-white bg-opacity-50 rounded-lg"></div>

  {/* Nội dung menu */}
  <div className="relative z-10">
    <div className="flex flex-row space-x-2 mx-auto">
      <h2
        className="text-5xl font-fancy text-center mb-2 mx-auto text-white"
        data-aos="fade-up"
      >
        <i>
          <b>Thực Đơn</b>
        </i>
      </h2>
      
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-2 mx-auto">
  {isLoading ? (
    <p className="text-white">Loading...</p>
  ) : (
    topSellingItems.map((item, index) => (
      <div
        key={item.id}
        className="group bg-cover bg-center relative rounded-lg shadow cursor-pointer hover:shadow-lg transition-all duration-300"
        style={{
          backgroundImage: `url(${item.image_url})`,
          height: "400px",
        }}
        data-aos="fade-up"
        data-aos-delay={index * 100}
        onClick={() => openModal(item)}
      >
        {/* Lớp phủ */}
<div className="absolute bottom-0 left-0 w-full h-16 bg-black rounded-b-lg overflow-hidden transition-all duration-300 group-hover:h-full flex flex-col justify-center items-center opacity-80 group-hover:opacity-50">
  {/* Tên món ăn */}
  <p className="relative text-white font-bold z-20 group-hover:mb-32 group-hover:text-white text-shadow-md">
    {item.name}
  </p>
</div>

        {/* Nội dung khi hover */}
        <div className="absolute bottom-0 left-0 w-full h-full bg-black bg-opacity-50 transition-all duration-300 group-hover:h-full flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 z-10">
          <p className="relative text-white text-center opacity-100 group-hover:opacity-100 transition-opacity duration-300 mt-32 z-20">
            {item.description}
          </p>
          <p className="relative text-green-500 font-bold opacity-100 group-hover:opacity-100 transition-opacity duration-300 mt-2 z-20">
          {Number(item.price).toLocaleString("vi-VN", { minimumFractionDigits: 0 })} VND
          </p>
        </div>
      </div>
    ))
  )}
</div>

    <div className="text-center mt-6 mx-auto" data-aos="fade-up">
      <button
        onClick={() => navigate("/thucdon")}
        className="btn-view-more w-1/6 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 font-semibold rounded-full shadow-lg hover:from-blue-600 hover:to-purple-600 transition duration-300 ease-in-out transform hover:scale-105 ml-32"
        data-aos="fade-up"
      >
        <p className="mx-auto text-white">Xem Thêm</p>
      </button>
    </div>
  </div>
</div>

<div className="introduction-section text-white rounded-lg  rounded-full flex flex-wrap items-center" data-aos="fade-up">
  <div className="w-full md:w-1/2 flex justify-center" data-aos="fade-up">
    <img src="https://posapp.vn/wp-content/uploads/2020/09/%C4%91%E1%BB%93ng-b%E1%BB%99-n%E1%BB%99i-th%E1%BA%A5t.jpg" alt="Restaurant" className="w-3/4 rounded-lg shadow-lg" />
  </div>

  <div className="w-full md:w-1/2 text-left mt-6 md:mt-0 px-6" data-aos="fade-up">
    <h2 className="text-5xl font-fancy text-center mb-6">
      <i>
        <b className="text-white">Về Chúng Tôi - Chèo Bẻo Restaurant</b>
      </i>
    </h2>
    <p className="text-lg leading-relaxed">
      Chào mừng bạn đến với nhà hàng của chúng tôi! Tại đây, chúng tôi tự hào mang đến những món ăn
      được chế biến từ nguyên liệu tươi ngon nhất, kết hợp với tình yêu và tâm huyết của đầu bếp.
      Với không gian ấm cúng và đội ngũ nhân viên tận tâm, chúng tôi hy vọng mang lại trải nghiệm
      ẩm thực tuyệt vời nhất cho bạn và gia đình.
    </p>
    <p className="text-lg leading-relaxed mt-4">
      Đừng quên khám phá thực đơn phong phú của chúng tôi và đặt bàn trước để đảm bảo chỗ ngồi tốt nhất.
      Chúng tôi rất mong được phục vụ bạn!
    </p>
    <div className="text-center mt-6 mx-auto">
      <a href="./reserve">
      <button
        onClick={() => navigate("/reserve")}
        className="btn-view-more w-max px-12 py-2 bg-gradient-to-r from-blue-500 to-purple-500 font-semibold rounded-full shadow-lg hover:from-blue-600 hover:to-purple-600 transition duration-300 ease-in-out transform hover:scale-105 ml-32"
        data-aos="fade-up"
      >
        <p className="mx-auto text-white">Đặt bàn ngay!</p>
      </button>
      </a>
    </div>
  </div>
</div>
{/* News Section */}
<div
  className="news-section py-10 bg-cover bg-center bg-no-repeat rounded-lg px-10 mx-auto relative"
  style={{
    backgroundImage: `url('https://images.pexels.com/photos/616401/pexels-photo-616401.jpeg?cs=srgb&dl=pexels-goumbik-616401.jpg&fm=jpg')`,
  }}
>
  {/* Lớp phủ */}
  <div className="absolute inset-0 bg-white bg-opacity-40 rounded-lg"></div>

  {/* Nội dung */}
  <div className="relative z-10">
    <h2 className="text-5xl font-fancy text-center text-white">
      <i>
        <b data-aos="fade-up">Tin Tức Nổi Bật</b>
      </i>
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto">
      {/* News Item 1 */}
      <a href="./article1">
        <div
          className="news-item bg-white p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
          data-aos="fade-up"
        >
          <div className="w-full h-40 overflow-hidden rounded-lg">
            <img
              src="https://noithattruongsa.com/wp-content/uploads/2023/09/thiet-ke-nha-hang-332-Hang-Noi-That-Truong-Sa.jpg"
              alt="News 1"
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="text-xl font-semibold mt-4">Khuyến Mãi Lớn Mùa Lễ Hội</h3>
          <p className="text-gray-600 mt-2">
            Nhận ưu đãi lớn khi đặt bàn hoặc gọi món trong tuần lễ Giáng Sinh.
          </p>
        </div>
      </a>
      {/* News Item 2 */}
      <a href="./article2">
        <div
          className="news-item bg-white p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
          data-aos="fade-up"
        >
          <div className="w-full h-40 overflow-hidden rounded-lg">
            <img
              src="https://sakos.vn/wp-content/uploads/2023/10/pad_thai__1__f7bd4f4931604756939e6ee41ec228d8.jpg"
              alt="News 2"
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="text-xl font-semibold mt-4">Món Mới Đặc Biệt</h3>
          <p className="text-gray-600 mt-2">
            Thưởng thức món ăn độc đáo được ra mắt vào tháng này, kết hợp hương vị Á-Âu.
          </p>
        </div>
      </a>
      {/* News Item 3 */}
      <a href="./article3">
        <div
          className="news-item bg-white p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
          data-aos="fade-up"
        >
          <div className="w-full h-40 overflow-hidden rounded-lg">
            <img
              src="https://posapp.vn/wp-content/uploads/2020/09/%C4%91%E1%BB%93ng-b%E1%BB%99-n%E1%BB%99i-th%E1%BA%A5t.jpg"
              alt="News 3"
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="text-xl font-semibold mt-4">Không Gian Mới Đầy Ấn Tượng</h3>
          <p className="text-gray-600 mt-2">
            Tận hưởng bữa ăn trong không gian được thiết kế sang trọng và hiện đại.
          </p>
        </div>
      </a>
    </div>
        <div className="text-center mt-4 mx-auto">
      <a href="./reserve">
      <button
        onClick={() => navigate("/news")}
        className="btn-view-more w-1/6 px-12 py-2 bg-gradient-to-r from-blue-500 to-purple-500 font-semibold rounded-full shadow-lg hover:from-blue-600 hover:to-purple-600 transition duration-300 ease-in-out transform hover:scale-105 ml-32 px-2 mx-auto"
        data-aos="fade-up"
      >
        <p className="mx-auto text-white">Xem thêm</p>
      </button>
      </a>
    </div>
  </div>
</div>

<div className="customer-reviews-section relative" data-aos="fade-up">
      {/* Background Image */}
      <div className="background-overlay absolute inset-0 z-0"></div>

      {/* Title */}
      <h2 className="text-5xl font-fancy text-center text-white relative z-10 mb-10">
        <b><i>Nhận Xét Từ Khách Hàng</i></b>
      </h2>

      {/* Slider */}
      <Slider {...sliderSettings} className="relative z-10">
        {reviews.map((review) => (
          <div key={review.id} className="text-center text-white px-10">
            <div className="flex flex-col items-center">
              <img
                src={review.image}
                alt={review.name}
                className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg mb-4"
              />
              <h3 className="text-2xl font-semibold">{review.name}</h3>
              <p className="text-lg italic mt-4">"{review.comment}"</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>



      {/* Hiển thị modal nếu isModalOpen là true */}
      {isModalOpen && (
        <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="modal-container bg-white p-6 rounded-lg">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-xl font-bold"
            >
              X
            </button>
            <OrderForm closeModal={closeModal} menuItem={selectedMenuItem} />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
