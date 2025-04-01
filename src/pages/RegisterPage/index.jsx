import { useState } from "react";
import { Form, Button, Alert,  Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import classes from "./SignUp.module.css";

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
    const { fullName, email, password, repassword, phone } = formData;

    // Kiểm tra nhập đầy đủ thông tin
    if (!fullName || !email || !password || !repassword || !phone) {
      setError("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    // Kiểm tra mật khẩu đủ mạnh
    if (password.length < 8) {
      setError("Mật khẩu phải có ít nhất 8 ký tự.");
      return;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError("Email không hợp lệ. Vui lòng nhập đúng định dạng email.");
      return;
    }
    if (password !== repassword) {
      setError("Mật khẩu nhập lại không trùng.");
      return;
    }
    const phoneRegex = /^(03|05|07|08|09)[0-9]{8}$/;
    if (!phoneRegex.test(phone)) {
      setError("Số điện thoại không hợp lệ. Vui lòng nhập số điện thoại di động Việt Nam hợp lệ.");
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
      <div className={`${classes["checkout-page"]} d-flex justify-content-center align-items-center vh-100 full-width`}>
        <Card className={classes["signup-card"]}>
          <h2 className={classes["signup-title"]}>Sign Up</h2>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className={classes["form-group"]}>
              <Form.Control
                  className={classes["form-control"]}
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className={classes["form-group"]}>
              <Form.Control
                  className={classes["form-control"]}
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className={classes["form-group"]}>
              <Form.Control
                  className={classes["form-control"]}
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className={classes["form-group"]}>
              <Form.Control
                  className={classes["form-control"]}
                  type="password"
                  name="repassword"
                  placeholder="Retype Password"
                  value={formData.repassword}
                  onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className={classes["form-group"]}>
              <Form.Control
                  className={classes["form-control"]}
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
              />
            </Form.Group>

            <Button
                type="submit"
                className={classes["submit-button"]}
                variant="dark"
            >
              SIGN UP
            </Button>
          </Form>

          <div className={classes["login-link"]}>
            Login? <a href="/login">Click</a>
          </div>
        </Card>
      </div>
  );
};

export default Register;
