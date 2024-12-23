import React from "react";

const relatedNews = [
  {
    id: 1,
    title: "Khám Phá Ẩm Thực Đường Phố",
    description: "Chìm đắm trong hương vị món ăn đường phố đậm đà, đặc sắc.",
    imageUrl: "https://www.eatandcooking.com/wp-content/uploads/2022/04/ẩm-thực-đường-phố.jpg",
    link: "/article1",
  },
  {
    id: 2,
    title: "Món Ăn Đặc Sắc Dành Cho Mùa Đông",
    description: "Khám phá các món ăn mùa đông ấm áp tại nhà hàng của chúng tôi.",
    imageUrl: "https://media-cdn.tripadvisor.com/media/photo-s/1c/6e/85/7c.jpg",
    link: "/article2",
  },
  {
    id: 3,
    title: "Sự Kiện Âm Nhạc & Ẩm Thực",
    description: "Thưởng thức các món ngon cùng âm nhạc live tại nhà hàng vào cuối tuần.",
    imageUrl: "https://www.hamburger-restaurant.com/wp-content/uploads/2020/11/music-food.jpg",
    link: "/article3",
  },
];

const Article5 = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-white shadow-lg rounded-lg">
        {/* Tiêu đề bài viết */}
        <h1 className="text-5xl font-bold text-gray-800 mb-6 text-center leading-tight">
          Những Món Ăn Mùa Đông Tuyệt Vời
        </h1>

        {/* Nội dung */}
        <div className="space-y-6">
          <p className="text-lg text-gray-700 leading-relaxed">
            Mùa đông đã đến, và chúng tôi giới thiệu đến bạn những món ăn đặc biệt để giúp bạn giữ ấm và thưởng thức bữa ăn tuyệt vời. Đừng bỏ lỡ cơ hội thử các món ăn mang đậm hương vị mùa đông!
          </p>

          {/* Hình ảnh */}
          <div className="flex justify-center">
            <img
              src="https://cdn.pixabay.com/photo/2017/02/18/10/12/food-2070677_960_720.jpg"
              alt="Món ăn mùa đông"
              className="rounded-lg shadow-md w-full max-w-4xl"
            />
          </div>

          <p className="text-lg text-gray-700 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
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

export default Article5;
