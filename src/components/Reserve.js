import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import emailjs from "emailjs-com";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import "./BookingForm.css";

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    date: new Date(),
    time: "",
    people: "",
    table: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleDateChange = (date) => {
    setFormData((prevData) => ({ ...prevData, date }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_sdcvjvb",
        "template_sy2cpf5",
        {
          name: formData.name,
          date: formData.date.toDateString(),
          time: formData.time,
          people: formData.people,
          table: formData.table,
        },
        "mhTSS6RGrkSJvy5wd"
      )
      .then(
        (response) => {
          console.log("Email sent successfully", response);
          setIsModalOpen(true);
          setFormData({
            name: "",
            date: new Date(),
            time: "",
            people: "",
            table: "",
          });
        },
        (error) => {
          console.error("Error sending email", error);
        }
      );
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      className="bg-cover bg-center min-h-screen flex flex-col items-center relative"
      style={{
        backgroundImage: `url('https://img.freepik.com/free-photo/dark-surface-with-blank-space-fast-food-menu_23-2147684608.jpg')`,
      }}
      data-aos="fade-in"
    >
      <div className="absolute inset-0 bg-white opacity-20 z-0"></div>
      <div className="relative z-10 w-full max-w-screen-xl mx-auto">
        <div className="flex flex-col w-full max-w-screen-xl my-4 mx-auto" data-aos="slide-up">
          <form onSubmit={handleSubmit} className="w-full">
            <h1 className="text-4xl font-bold text-black mb-2 font-fancy">
              <b>
                <i>Đặt Bàn</i>
              </b>
            </h1>
            <hr className="border-t border-black mb-8" />
            <div className="mt-8">
              <label htmlFor="name" className="block mb-2 text-black">
                Tên Người Đặt:
              </label>
              <input
                type="text"
                placeholder="Nguyễn Văn A"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded text-black"
                required
              />
            </div>

            <div>
              <label htmlFor="date" className="block mb-2 text-black">
                Ngày:
              </label>
              <Calendar
                onChange={handleDateChange}
                value={formData.date}
                className="calendar-style"
                minDate={new Date()}
                prevLabel={<FaChevronLeft />}
                nextLabel={<FaChevronRight />}
              />
            </div>

            <div>
              <label htmlFor="time" className="block mb-2 mt-4 text-black">
                Thời Gian:
              </label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full p-2 border rounded text-black"
                required
              />
            </div>

            <div>
              <label htmlFor="people" className="block mb-2 text-black">
                Số Người:
              </label>
              <input
                type="number"
                id="people"
                placeholder="0"
                name="people"
                value={formData.people}
                onChange={handleChange}
                className="w-full p-2 border rounded text-black"
                required
              />
            </div>

            <div>
              <label htmlFor="table" className="block mb-2 text-black">
                Số Bàn:
              </label>
              <input
                type="number"
                id="table"
                placeholder="0"
                name="table"
                value={formData.table}
                onChange={handleChange}
                className="w-full p-2 border rounded text-black"
                required
              />
            </div>

            <button
              type="submit"
              className="w-1/2 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-center"
            >
              <p className="mx-auto">Xác nhận</p>
            </button>
          </form>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20"
          data-aos="zoom-in"
        >
          <div className="bg-white p-6 rounded shadow-md text-center">
            <h2 className="text-2xl font-bold mb-4">Đặt bàn thành công!</h2>
            <p>Cảm ơn bạn đã đặt bàn. Chúng tôi sẽ liên hệ bạn sớm!</p>
            <button
              onClick={closeModal}
              className="mt-4 px-4 mx-auto py-2 bg-red-500 w-1/4 text-white rounded hover:bg-red-600"
            >
              <p className="mx-auto">Đóng</p>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingForm;
