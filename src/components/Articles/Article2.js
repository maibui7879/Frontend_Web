import React, { useEffect } from "react";
import "./Article.css";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

const relatedNews = [
  {
    id: 1,
    title: "Đại Tiệc Đặc Biệt Tháng 12",
    description: "Thưởng thức bữa tiệc đỉnh cao với ưu đãi giảm giá 50% tại tất cả chi nhánh.",
    imageUrl: "https://noithattruongsa.com/wp-content/uploads/2023/09/thiet-ke-nha-hang-332-Hang-Noi-That-Truong-Sa.jpg",
    link: "/article1",
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
];

const Article2 = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      easing: "ease-out", // Animation easing
      once: true, // Trigger animation only once
    });
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div
        className="container mx-auto py-12 sm:px-6 lg:px-8 bg-white shadow-lg rounded-lg"
        data-aos="fade-up"
      >
        {/* Article Title */}
        <h1 className="text-5xl font-bold text-gray-800 mb-6 text-center leading-tight font-fancy">
          <b><i>Khuyến Mãi Lớn Mùa Lễ Hội</i></b>
        </h1>

        {/* Content */}
        <div className="space-y-6 mx-32">
          <p className="text-lg text-gray-700 leading-relaxed">
            Mùa lễ hội là thời điểm lý tưởng để sum họp và chia sẻ những khoảnh khắc đáng nhớ bên gia đình, bạn bè.
            Nhà hàng của chúng tôi mang đến chương trình <b>“Khuyến Mãi Lớn Mùa Lễ Hội”</b>, giúp bạn tận hưởng
            những bữa tiệc trọn vẹn hơn bao giờ hết.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Đặt bàn hoặc gọi món ngay hôm nay để nhận ngay các ưu đãi đặc biệt, từ giảm giá trực tiếp đến quà tặng hấp dẫn.
          </p>

          {/* Image */}
          <div className="flex justify-center">
            <img
              src="https://cybershow.vn/wp-content/uploads/2022/07/le-khai-truong-nha-hang-yakuzen-87-1280x720.jpg"
              alt="Khuyến Mãi Lớn Mùa Lễ Hội"
              className="rounded-lg shadow-md w-full max-w-4xl"
            />
          </div>

          {/* Conclusion */}
          <p className="text-lg text-gray-700 leading-relaxed">
            Đừng bỏ lỡ cơ hội trải nghiệm không gian sang trọng, dịch vụ tận tình và những món ăn tinh hoa của chúng tôi.
          </p>
        </div>

        {/* Call to Action */}
        <div className="mt-10 text-center">
          <a
            href="/reserve"
            className="inline-block bg-red-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-red-600 transition duration-300"
          >
            Đặt Bàn Ngay
          </a>
        </div>

        {/* Related News */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Tin tức liên quan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedNews.map((news) => (
              <a
                key={news.id}
                href={news.link}
                className="block bg-white border rounded-lg shadow hover:shadow-lg transition transform hover:scale-105"
              >
                <img
                  src={news.imageUrl}
                  alt={news.title}
                  className="w-full h-40 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">{news.title}</h3>
                  <p className="text-sm text-gray-600 mt-2">{news.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Article2;
