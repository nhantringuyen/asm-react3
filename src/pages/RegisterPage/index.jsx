import { useState } from "react";
import { Form, Button, Alert, Container, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { fullName, email, password, phone } = formData;

    // Kiểm tra nhập đầy đủ thông tin
    if (!fullName || !email || !password || !phone) {
      setError("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    // Kiểm tra mật khẩu đủ mạnh
    if (password.length < 8) {
      setError("Mật khẩu phải có ít nhất 8 ký tự.");
      return;
    }

    // Lấy danh sách user từ localStorage
    let userArr = JSON.parse(localStorage.getItem("users")) || [];

    // Kiểm tra email đã tồn tại chưa
    if (userArr.some((user) => user.email === email)) {
      setError("Email đã được sử dụng. Vui lòng chọn email khác.");
      return;
    }

    // Thêm user vào danh sách
    userArr.push({ fullName, email, password, phone });
    localStorage.setItem("users", JSON.stringify(userArr));

    alert("Đăng ký thành công! Chuyển hướng đến trang đăng nhập...");
    navigate("/login");
  };

  return (
      <div className="d-flex justify-content-center align-items-center vh-100 full-width">
        <Card style={{ width: "400px", padding: "20px" }}>
          <Card.Title className="text-center">Sign Up</Card.Title>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
              />
            </Form.Group>
            <Button type="submit" variant="dark" className="w-100 mt-3">
              SIGN UP
            </Button>
          </Form>
          <div className="text-center mt-3">
            <small>
              Already have an account? <a href="/login">Login</a>
            </small>
          </div>
        </Card>
      </div>
  );
};

export default Register;
