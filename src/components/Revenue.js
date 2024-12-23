import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  PieController,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import AOS from "aos";
import "aos/dist/aos.css";

ChartJS.register(
  LineElement,
  BarElement,
  PieController,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  ArcElement,
  ChartDataLabels
);

const Revenue = () => {
  const [dailyRevenue, setDailyRevenue] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartType, setChartType] = useState("line");
  const [productChartType, setProductChartType] = useState("pie");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [revenueRes, orderItemsRes, menuRes] = await Promise.all([
          axios.get("http://localhost:3001/api/revenue/daily-revenue"),
          axios.get("http://localhost:3001/api/order-items"),
          axios.get("http://localhost:3001/menu"),
        ]);

        setDailyRevenue(revenueRes.data.daily_revenue || []);
        setOrderItems(orderItemsRes.data || []);
        setMenu(menuRes.data || []);
      } catch (error) {
        console.error("Error fetching data:", error.response || error);
        alert("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const totalRevenueToday =
    dailyRevenue.length > 0
      ? parseFloat(dailyRevenue[dailyRevenue.length - 1].total_revenue)
      : 0;

  const totalRevenue = dailyRevenue.reduce(
    (total, record) => total + parseFloat(record.total_revenue),
    0
  );

  const productRevenue = {};
  orderItems.forEach((item) => {
    const product = menu.find((m) => m.id === item.menu_id);
    if (product) {
      const revenue = item.quantity * parseFloat(product.price);
      productRevenue[product.name] =
        (productRevenue[product.name] || 0) + revenue;
    }
  });

  const totalProductRevenue = Object.values(productRevenue).reduce(
    (sum, value) => sum + value,
    0
  );

  const pieChartData = {
    labels: Object.keys(productRevenue),
    datasets: [
      {
        label: "Tổng Doanh Thu Sản Phẩm",
        data: Object.values(productRevenue),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  const barChartData = {
    labels: Object.keys(productRevenue),
    datasets: [
      {
        label: "Tổng Doanh Thu Sản Phẩm (VND)",
        data: Object.values(productRevenue),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartData = {
    labels: dailyRevenue.map((record) => record.date.split("T")[0]),
    datasets: [
      {
        label: "Doanh Thu Online Hàng Ngày (VND)",
        data: dailyRevenue.map((record) => record.total_revenue),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor:
          chartType === "line"
            ? "rgba(75, 192, 192, 0.2)"
            : "rgba(75, 192, 192, 0.6)",
        borderWidth: 2,
        pointRadius: chartType === "line" ? 3 : 0,
        tension: chartType === "line" ? 0.2 : 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      datalabels: {
        color: "#000",
        formatter: (value) =>
          `${((value / totalProductRevenue) * 100).toFixed(2)}%`,
        font: {
          weight: "bold",
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Ngày",
        },
      },
      y: {
        title: {
          display: true,
          text: "Doanh Thu (VND)",
        },
        ticks: {
          callback: (value) => value.toLocaleString(),
        },
      },
    },
  };

  return (
    <div className="p-8">
      <div className="flex gap-8 mb-8">
        <div className="w-1/2 bg-green-200 p-4 rounded-lg shadow-md" data-aos="fade-up">
          <h3 className="font-semibold text-xl mb-2 text-black">Tổng Doanh Thu Online Hôm Nay</h3>
          {loading ? (
            <p className="text-black">Đang tải...</p>
          ) : (
            <p className="text-2xl font-bold text-black">
              {totalRevenueToday.toLocaleString()} VND
            </p>
          )}
        </div>

        <div className="w-1/2 bg-blue-200 p-4 rounded-lg shadow-md" data-aos="fade-up">
          <h3 className="font-semibold text-xl mb-2 text-black">Tổng Doanh Thu Online</h3>
          {loading ? (
            <p className="text-black">Đang tải...</p>
          ) : (
            <p className="text-2xl font-bold text-black">
              {totalRevenue.toLocaleString()} VND
            </p>
          )}
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md" data-aos="fade-up">
        <h3 className="font-semibold text-xl mb-4 text-black">Biểu Đồ Doanh Thu Online Theo Ngày</h3>
        <div className="mb-4 flex justify-center">
          <select
            className="bg-white text-black p-2 rounded-lg w-2/5 border border-black"
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
          >
            <option value="line">Biểu Đồ Đường</option>
            <option value="bar">Biểu Đồ Cột</option>
          </select>
        </div>
        {loading ? (
          <p className="text-black">Đang tải biểu đồ...</p>
        ) : (
          chartType === "line" ? (
            <Line data={chartData} options={chartOptions} />
          ) : (
            <Bar data={chartData} options={chartOptions} />
          )
        )}
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md mt-8" data-aos="fade-up">
        <h3 className="font-semibold text-xl mb-4 text-black">Phần Trăm Doanh Thu Theo Sản Phẩm</h3>
        <div className="mb-4 flex justify-center">
          <select
            className="bg-white text-black p-2 rounded-lg w-2/5 border border-black"
            value={productChartType}
            onChange={(e) => setProductChartType(e.target.value)}
          >
            <option value="pie">Biểu Đồ Tròn</option>
            <option value="bar">Biểu Đồ Cột</option>
          </select>
        </div>
        {loading ? (
          <p className="text-black">Đang tải biểu đồ...</p>
        ) : (
          productChartType === "pie" ? (
            <div className="flex justify-center">
              <div style={{ width: "50%" }}>
                <Pie
                  data={pieChartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                      legend: {
                        position: "right",
                        labels: {
                          color: "#000",
                          font: { size: 14 },
                        },
                      },
                      datalabels: {
                        color: "#000",
                        formatter: (value) =>
                          `${((value / totalProductRevenue) * 100).toFixed(2)}%`,
                        font: { weight: "bold" },
                      },
                    },
                  }}
                />
              </div>
            </div>
          ) : (
            <Bar data={barChartData} options={chartOptions} />
          )
        )}
      </div>
    </div>
  );
};

export default Revenue;
