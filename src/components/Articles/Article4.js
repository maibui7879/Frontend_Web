import React from "react";
import "./Article.css";

const relatedNews = [
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
];

const Article4 = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div
        className="container mx-auto py-12 sm:px-6 lg:px-8 bg-white shadow-lg rounded-lg"
        data-aos="fade-up" // Áp dụng hiệu ứng fade-up (trượt nhẹ lên)
      >
        {/* Tiêu đề bài viết */}
        <h1 className="text-5xl font-bold text-gray-800 mb-6 text-center leading-tight font-fancy">
          <b><i>Không Gian Mới Đầy Ấn Tượng</i></b>
        </h1>

        {/* Nội dung */}
        <div className="space-y-6">
          <p className="text-lg text-gray-700 leading-relaxed">
            Tận hưởng bữa ăn trong không gian mới, được thiết kế sang trọng và hiện đại. Đây không chỉ là nơi dùng
            bữa, mà còn là nơi bạn cảm nhận sự tinh tế trong từng chi tiết.
          </p>

          {/* Hình ảnh */}
          <div className="flex justify-center">
            <img
              src="https://posapp.vn/wp-content/uploads/2020/09/%C4%91%E1%BB%93ng-b%E1%BB%99-n%E1%BB%99i-th%E1%BA%A5t.jpg"
              alt="Không Gian Mới Đầy Ấn Tượng"
              className="rounded-lg shadow-md w-full max-w-4xl"
            />
          </div>

          {/* Kết luận */}
          <p className="text-lg text-gray-700 leading-relaxed">
            Hãy ghé thăm và trải nghiệm ngay hôm nay!
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

        {/* Tin tức liên quan */}
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

export default Article4;
