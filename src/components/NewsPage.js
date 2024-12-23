import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "./NewsPage.css";

const NewsPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("next");
  const navigate = useNavigate();

  const newsList = [
    {
      id: 1,
      title: "Đại Tiệc Đặc Biệt Tháng 12",
      description: "Thưởng thức bữa tiệc đỉnh cao với ưu đãi giảm giá 50% tại tất cả chi nhánh.",
      imageUrl: "https://noithattruongsa.com/wp-content/uploads/2023/09/thiet-ke-nha-hang-332-Hang-Noi-That-Truong-Sa.jpg",
      link: "/article1",
    },
    {
      id: 2,
      title: "Khuyến Mãi Lớn Mùa Lễ Hội",
      description: "Nhận ưu đãi lớn khi đặt bàn hoặc gọi món nhân dịp cuối năm.",
      imageUrl: "https://cybershow.vn/wp-content/uploads/2022/07/le-khai-truong-nha-hang-yakuzen-87-1280x720.jpg",
      link: "/article2",
    },
    {
      id: 3,
      title: "Món Mới Đặc Biệt",
      description: "Thưởng thức món ăn độc đáo được ra mắt vào tháng này, kết hợp hương vị Á-Âu.",
      imageUrl: "https://sakos.vn/wp-content/uploads/2023/10/pad_thai__1__f7bd4f4931604756939e6ee41ec228d8.jpg",
      link: "/article3",
    },
    {
      id: 4,
      title: "Không Gian Mới Đầy Ấn Tượng",
      description: "Tận hưởng bữa ăn trong không gian được thiết kế sang trọng và hiện đại.",
      imageUrl: "https://posapp.vn/wp-content/uploads/2020/09/%C4%91%E1%BB%93ng-b%E1%BB%99-n%E1%BB%99i-th%E1%BA%A5t.jpg",
      link: "/article3",
    },
    {
      id: 5,
      title: "Đầu Bếp Hàng Đầu Chia Sẻ Bí Quyết",
      description: "Gặp gỡ và học hỏi từ những đầu bếp hàng đầu tại nhà hàng của chúng tôi.",
      imageUrl: "https://i.redd.it/stoc6y8mwov61.png",
      link: "/article5",
    },
    {
      id: 6,
      title: "Công Nghệ Trong Ẩm Thực",
      description: "Khám phá cách công nghệ thay đổi ngành ẩm thực hiện đại.",
      imageUrl: "https://posapp.vn/wp-content/uploads/2020/09/%C4%91%E1%BB%93ng-b%E1%BB%99-n%E1%BB%99i-th%E1%BA%A5t.jpg",
      link: "/article6",
    },
    {
      id: 7,
      title: "Thực Đơn Đặc Biệt Dịp Lễ",
      description: "Thưởng thức thực đơn độc quyền trong mùa lễ hội.",
      imageUrl: "https://i.ex-cdn.com/vntravellive.com/files/news/2023/02/09/nha-hang-tai-ha-noi-cho-dem-valentine-163232.jpg",
      link: "/article7",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection("next");
      setCurrentIndex((prevIndex) => (prevIndex + 1) % newsList.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [newsList.length]);

  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out", once: true });
  }, []);

  const handleNewsClick = (link) => {
    navigate(link); // Chuyển hướng đến link tương ứng
  };

  return (
    <div className="news-page bg-gray-100 min-h-screen relative">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://png.pngtree.com/thumb_back/fh260/background/20231230/pngtree-illustrated-vector-background-restaurant-menu-design-with-paper-texture-food-and-image_13914730.png')" }}>
        {/* Overlay */}
        <div className="absolute inset-0 bg-white opacity-50"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="bg-gray-800 text-white py-8 shadow-md rounded-b-lg">
          <div className="container mx-auto">
            <h1 className="text-4xl font-bold font-fancy1 text-center mb-4" data-aos="fade-up">
              <b><i>Tin Tức</i></b>
            </h1>
          </div>

          {/* Featured News - Carousel */}
          {newsList.length > 0 && (
            <div className="relative px-4">
              <div
                className={`relative w-full h-64 rounded-md overflow-hidden transition-transform duration-700 ease-in-out transform ${
                  direction === "next" ? "slide-next" : "slide-prev"
                }`}
                style={{
                  backgroundImage: `url(${newsList[currentIndex].imageUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "500px",
                }}
                onClick={() => handleNewsClick(newsList[currentIndex].link)}
              >
                
                <div className="absolute inset-0 bg-black bg-opacity-50 z-10 cursor-pointer"></div>
                <div className="absolute bottom-0 left-0 z-20 text-white p-4">
                  <h2 className="text-3xl font-bold">{newsList[currentIndex].title}</h2>
                  <p className="mt-2">{newsList[currentIndex].description}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <main className="container mx-auto py-8">
          <h2 className="text-2xl font-bold font-fancy2 mb-2 mt-4 text-center " data-aos="fade-up">
            <b><i>Tin Tức Nổi Bật</i></b>
          </h2>

          {/* Main News */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 mx-auto" data-aos="fade-up">
            {newsList.slice(1, 4).map((news) => (
              <div
                key={news.id}
                className="border rounded-md shadow-sm overflow-hidden bg-white hover:shadow-lg transition-all cursor-pointer "
                onClick={() => handleNewsClick(news.link)}
              >
                <img src={news.imageUrl} alt={news.title} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-bold">{news.title}</h3>
                  <p className="text-sm text-gray-600">{news.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Additional News */}
          <div className="space-y-4 mx-8" data-aos="fade-up">
            {newsList.slice(4).map((news) => (
              <div
                key={news.id}
                className="flex items-start gap-4 border p-4 rounded-md shadow-sm bg-white hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => handleNewsClick(news.link)}
                
              >
                <img src={news.imageUrl} alt={news.title} className="w-24 h-24 object-cover rounded-md" />
                <div>
                  <h3 className="text-lg font-bold">{news.title}</h3>
                  <p className="text-sm text-gray-600">{news.description}</p>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default NewsPage;
