import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import "./FeedbackForm.css";
import AOS from "aos";
import "aos/dist/aos.css";

const CustomerSupport = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [activeSection, setActiveSection] = useState("faqs");

  const questions = [
    {
      question:
        "Có 3 lọ mất nhãn chứa 3 dung dịch : HCl, H2SO4.Na2SO4. Bằng phương pháp hoá học hãy nhân biết mỗi lọ và viết phương trình phản ứng",
      answer: "Nhầm chỗ rồi ní.",
    },
    {
      question: "Nhà hàng có skibidi không?",
      answer:
        "Bồn cầu vệ sinh thương hiệu Viglacera là hãng thiết bị vệ sinh nổi tiếng của Italy, hiện đã có mặt ở gần 100 quốc gia trên thế giới. Kể từ khi có mặt tại thị trường Việt Nam, bàn cầu Viglacera đã nhanh chóng chinh phục được đông đảo người tiêu dùng nhờ chất lượng sản phẩm lẫn giá thành phải chăng.",
    },
    {
      question: "Sốp có ship đồ xa không? Mình ở Mỹ(Đình) muốn đặt món.",
      answer: "Không.",
    },
    {
      question: "Assmin có ny chưa?",
      answer: "Mình đã lập gia đình. Vợ mình là Fu lùn.",
    },
  ];

  const contactMethods = [
    { method: "Phone", detail: "03295569941", icon: "📞" },
    { method: "Email", detail: "maibui7879@gmail.com", icon: "✉️" },
    { method: "Zalo", detail: "0329556941", icon: "💬" },
    { method: "Messenger", detail: "Đức Mạnh", icon: "📱" },
  ];

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .send(
        "service_sdcvjvb",
        "template_sy2cpf5",
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        "mhTSS6RGrkSJvy5wd"
      )
      .then(
        () => {
          setIsSuccess(true);
          setIsError(false);
          setFormData({ name: "", email: "", message: "" });
        },
        (error) => {
          console.error("EmailJS Error:", error);
          setIsSuccess(false);
          setIsError(true);
        }
      );
  };

  return (
    <div className="flex min-h-screen feedback-form">
      {/* Sidebar */}
      <div className="sidebar w-1/8">
        <h2 className="text-2xl font-bold mb-6 text-white">Chăm sóc khách hàng</h2>
        <ul className="space-y-4">
          <li>
            <button
              onClick={() => setActiveSection("faqs")}
              className={`w-full text-left bg-transparent text-white hover:text-blue-500 rounded py-2 ${
                activeSection === "faqs" ? "font-bold" : ""
              }`}
            >
              FAQs
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveSection("contact")}
              className={`w-full text-left bg-transparent text-white hover:text-blue-500 rounded py-2 ${
                activeSection === "contact" ? "font-bold" : ""
              }`}
            >
              Thông tin liên hệ
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveSection("form")}
              className={`w-full text-left bg-transparent text-white hover:text-blue-500 rounded py-2 ${
                activeSection === "form" ? "font-bold" : ""
              }`}
            >
              Form phản hồi
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-full p-6 main-content-1">
        <h2 className="font-fancy mx-auto">Chăm sóc khách hàng</h2>
        {activeSection === "faqs" && (
          <section className="mb-8 bg-white px-8 py-8 rounded-lg">
            <h4 className="text-xl font-semibold mb-4 text-left" data-aos="fade-up">
              Những câu hỏi thường gặp
            </h4>
            <ul className="space-y-4" data-aos="fade-up">
              {questions.map((item, index) => (
                <li key={index} >
                  <button className="w-full text-left py-2 px-4 bg-white shadow rounded hover:shadow-md focus:outline-none">
                    <b>{item.question}</b>
                  </button>
                  <p className="mt-2 p-4 bg-indigo-50 border-l-4 border-indigo-400 text-gray-700 rounded">
                    <p className="text-left">{item.answer}</p>
                  </p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {activeSection === "contact" && (
          <section className="mb-8 h-screen bg-gradient-to-t">
            <h4 className="text-xl font-semibold my-4 text-left" data-aos="fade-up">
              Thông tin liên hệ
            </h4>
            <div className="grid grid-cols-2 gap-4" data-aos="fade-up">
              {contactMethods.map((method, index) => (
                <div
                  key={index}
                  className="flex items-center p-4 bg-white shadow rounded hover:shadow-lg transition-all"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <span className="text-3xl mr-4">{method.icon}</span>
                  <div>
                    <h5 className="font-bold">{method.method}</h5>
                    <p className="text-gray-600">{method.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeSection === "form" && (
          <section>
            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 shadow rounded my-8" data-aos="fade-up">
              <h2 className="text-left text-2xl border-b border-black py-4"><b>Form phản hồi</b></h2>
              <div>
                
                <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                  Tên:
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Nguyễn Văn A"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:ring focus:ring-indigo-300"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                  Email hoặc SDT:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="abc@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:ring focus:ring-indigo-300"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-700 font-bold mb-2">
                  Phản hồi:
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Phản hồi của bạn"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full p-2 border rounded focus:ring focus:ring-indigo-300"
                  required
                />
              </div>

              <button
                type="submit"
                className="py-2 px-6 bg-indigo-500 text-white font-bold rounded hover:bg-indigo-700"
              >
                Submit
              </button>

              {isSuccess && (
                <p className="mt-4 text-green-500 font-semibold">
                  Feedback submitted successfully!
                </p>
              )}
              {isError && (
                <p className="mt-4 text-red-500 font-semibold">
                  Failed to send feedback. Please try again later.
                </p>
              )}
            </form>
          </section>
        )}
      </div>
    </div>
  );
};

export default CustomerSupport;
