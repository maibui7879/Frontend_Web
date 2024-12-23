import React from "react";

const relatedNews = [
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
    description: "Nhận ngay ưu đãi lớn cho mùa lễ hội với các món ăn đặc sắc.",
    imageUrl: "https://cybershow.vn/wp-content/uploads/2022/07/le-khai-truong-nha-hang-yakuzen-87-1280x720.jpg",
    link: "/article2",
  },
  {
    id: 3,
    title: "Món Mới Đặc Biệt",
    description: "Trải nghiệm món ăn mới kết hợp giữa hương vị Á và Âu.",
    imageUrl: "https://sakos.vn/wp-content/uploads/2023/10/pad_thai__1__f7bd4f4931604756939e6ee41ec228d8.jpg",
    link: "/article3",
  },
];

const Article7 = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-white shadow-lg rounded-lg">
        {/* Tiêu đề bài viết */}
        <h1 className="text-5xl font-bold text-gray-800 mb-6 text-center leading-tight">
          Đầu Bếp Hàng Đầu Chia Sẻ Bí Quyết
        </h1>

        {/* Nội dung */}
        <div className="space-y-6">
          <p className="text-lg text-gray-700 leading-relaxed">
            Đừng bỏ lỡ cơ hội gặp gỡ những đầu bếp hàng đầu tại nhà hàng của chúng tôi! Đây là dịp đặc biệt để bạn
            học hỏi những bí quyết nấu ăn và khám phá câu chuyện đằng sau mỗi món ăn đẳng cấp.
          </p>

          {/* Hình ảnh */}
          <div className="flex justify-center">
            <img
              src="https://i.redd.it/stoc6y8mwov61.png"
              alt="Đầu Bếp Hàng Đầu Chia Sẻ Bí Quyết"
              className="rounded-lg shadow-md w-full max-w-4xl"
            />
          </div>
          <p className="text-lg text-gray-700 leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
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

export default Article7;
