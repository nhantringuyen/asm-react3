import { useState } from "react";
import { useDispatch } from "react-redux";
import { onLogin } from "../../services/authSlice";
import { Form, Button, Alert, Container, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;

    // Kiểm tra nhập đầy đủ thông tin
    if (!email || !password) {
      setError("Vui lòng nhập đầy đủ Email và Mật khẩu.");
      return;
    }

    // Lấy danh sách user từ localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Kiểm tra user hợp lệ
    const user = users.find((user) => user.email === email && user.password === password);

    if (!user) {
      setError("Email hoặc mật khẩu không chính xác.");
      setFormData({ ...formData, password: "" });
      return;
    }

    // Cập nhật Redux và localStorage
    dispatch(onLogin(user));

    alert("Đăng nhập thành công!");
    navigate("/");
  };

  return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Card style={{ width: "400px", padding: "20px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" }}>
          <Card.Title className="text-center" style={{ fontSize: "24px", fontStyle: "italic" }}>Sign In</Card.Title>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
              />
            </Form.Group>
            <Button type="submit" variant="dark" className="w-100 mt-3">
              SIGN IN
            </Button>
          </Form>
          <div className="text-center mt-3">
            <small>
              Create an account? <a href="/register">Sign up</a>
            </small>
          </div>
        </Card>
      </Container>
  );
};

export default Login;
