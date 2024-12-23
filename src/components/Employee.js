import React, { useState, useEffect } from "react";
import axios from "axios";
import "aos/dist/aos.css";
import AOS from "aos";

// Main Employee Component
const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingEmployee, setEditingEmployee] = useState(null);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 800, // Animation duration
      easing: "ease-in-out", // Animation easing
      once: true, // Animation runs once
    });
  }, []);

  // Fetch employee data
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/employee");
        const formattedEmployees = response.data.map((emp) => ({
          ...emp,
          ngaySinh: emp.ngaySinh.slice(0, 10), // Format date to YYYY-MM-DD
        }));
        setEmployees(formattedEmployees);
      } catch (error) {
        console.error("Error fetching employees:", error);
        alert("Failed to fetch employee data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  // Handle change in editable fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  // Handle modal close
  const handleModalClose = () => {
    setEditingEmployee(null);
  };

  // Save changes to employee
  const handleSave = async (employee) => {
    try {
      if (employee.id) {
        await axios.put(`http://localhost:3001/api/employee/${employee.id}`, employee);
      } else {
        await axios.post("http://localhost:3001/api/employee", employee);
      }
      setEditingEmployee(null);
      const response = await axios.get("http://localhost:3001/api/employee");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error saving employee:", error);
    }
  };

  // Delete employee
  const handleDelete = async (employeeId) => {
    try {
      await axios.delete(`http://localhost:3001/api/employee/${employeeId}`);
      setEmployees((prevEmployees) =>
        prevEmployees.filter((emp) => emp.id !== employeeId)
      );
      setEditingEmployee(null);
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  // Close modal when clicking outside of it
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleModalClose();
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen flex justify-center items-center py-8">
    <div className="py-8 bg-white mx-8 shadow-lg">
      <h3 className="font-semibold text-2xl mb-4 text-black border-b border-gray-200" data-aos="fade-up">
        <p className="mx-8">Danh Sách Nhân Viên</p>
      </h3>

      {loading ? (
        <p className="text-black" data-aos="fade-up">
          Đang tải dữ liệu...
        </p>
      ) : (
        <div className="overflow-x-auto max-h-96 mx-8" data-aos="fade-up">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead className="bg-blue-400 sticky top-0 z-10">
              <tr className="bg-blue-400 text-white">
                <th className="py-2 px-4 border border-gray-300 w-[150px]">ID</th>
                <th className="py-2 px-4 border border-gray-300 w-[150px]">Tên</th>
                <th className="py-2 px-4 border border-gray-300 w-[150px]">Tuổi</th>
                <th className="py-2 px-4 border border-gray-300 w-[150px]">Số Điện Thoại</th>
                <th className="py-2 px-4 border border-gray-300 w-[150px]">Ngày Sinh</th>
                <th className="py-2 px-4 border border-gray-300 w-[150px]">Giới Tính</th>
                <th className="py-2 px-4 border border-gray-300 w-[150px]">Chức Vụ</th>
                <th className="py-2 px-4 border border-gray-300 w-[150px]">Tài Khoản</th>
                <th className="py-2 px-4 border border-gray-300 w-[150px]">Mật Khẩu</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr
                  key={employee.id}
                  className="text-center hover:bg-gray-100 cursor-pointer"
                  onClick={() => setEditingEmployee(employee)}
                >
                  <td className="py-2 px-4 border border-gray-300">{employee.id}</td>
                  <td className="py-2 px-4 border border-gray-300">{employee.ten}</td>
                  <td className="py-2 px-4 border border-gray-300">{employee.tuoi}</td>
                  <td className="py-2 px-4 border border-gray-300">{employee.sdt}</td>
                  <td className="py-2 px-4 border border-gray-300">{employee.ngaySinh}</td>
                  <td className="py-2 px-4 border border-gray-300">{employee.gioiTinh}</td>
                  <td className="py-2 px-4 border border-gray-300">{employee.chucVu}</td>
                  <td className="py-2 px-4 border border-gray-300">{employee.taiKhoan}</td>
                  <td className="py-2 px-4 border border-gray-300">{"*".repeat(8)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex justify-center mt-4" data-aos="zoom-in">
        <button
          onClick={() =>
            setEditingEmployee({
              id: null,
              ten: "",
              tuoi: "",
              sdt: "",
              ngaySinh: "",
              gioiTinh: "",
              chucVu: "",
              taiKhoan: "",
              matKhau: "",
            })
          }
          className="bg-green-500 text-white py-2 px-4 rounded-md w-1/6 text-center"
        >
          <p className="mx-auto">Thêm Nhân Viên</p>
        </button>
      </div>

      {editingEmployee && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10"
          onClick={handleBackdropClick}
        >
          <div
            className="bg-white p-8 rounded-lg w-[60%] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-semibold text-2xl mb-4">
              {editingEmployee.id ? "Sửa Thông Tin Nhân Viên" : "Thêm Nhân Viên"}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-black px-2"><b>Tên</b></label>
                <input
                  type="text"
                  name="ten"
                  value={editingEmployee.ten}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black px-2"><b>Tuổi</b></label>
                <input
                  type="number"
                  name="tuoi"
                  value={editingEmployee.tuoi}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black px-2"><b>Số điện thoại</b></label>
                <input
                  type="text"
                  name="sdt"
                  value={editingEmployee.sdt}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black px-2"><b>Ngày sinh</b></label>
                <input
                  type="date"
                  name="ngaySinh"
                  value={editingEmployee.ngaySinh}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black px-2"><b>Giới tính</b></label>
                <input
                  type="text"
                  name="gioiTinh"
                  value={editingEmployee.gioiTinh}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black px-2"><b>Chức vụ</b></label>
                <input
                  type="text"
                  name="chucVu"
                  value={editingEmployee.chucVu}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black px-2"><b>Tên Đăng Nhập</b></label>
                <input
                  type="text"
                  name="taiKhoan"
                  value={editingEmployee.taiKhoan}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black px-2"><b>Mật Khẩu</b></label>
                <input
                  type="password"
                  name="matKhau"
                  value={editingEmployee.matKhau}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
            </div>
            <div className="flex justify-end mt-4 space-x-2">
              <button
                onClick={() => handleSave(editingEmployee)}
                className="bg-blue-500 text-white py-2 px-4 rounded-md text-center"
              >
                <p classaName="mx-auto">Lưu</p>
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white py-2 px-4 rounded-md text-center"
              >
                <p classaName="mx-auto">Xóa</p>
              </button>
              <button
                onClick={handleModalClose}
                className="bg-gray-500 text-white py-2 px-4 rounded-md text-center"
              >
                <p classaName="mx-auto">Thoát</p>
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Employee;
