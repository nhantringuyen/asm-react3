import { useState } from "react";
import { useDispatch } from "react-redux";
import { ON_LOGIN } from "../../services/authSlice";
import { Form, Button, Alert, Container, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import classes from "./SignIn.module.css";

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
    dispatch(ON_LOGIN(user));
    alert("Đăng nhập thành công!");
    navigate("/");
  };

  return (
      <div className={classes["signin-page"]}>
        <Container className="d-flex justify-content-center align-items-center vh-100">
          <Card className={classes.card}>
            <Card.Title className={classes.title}>Sign In</Card.Title>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className={classes.inputGroup}>
                <Form.Control
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className={classes.inputField}
                />
              </Form.Group>
              <Form.Group className={classes.inputGroup}>
                <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className={classes.inputField}
                />
              </Form.Group>
              <Button type="submit"  variant="dark" className={classes.signInButton}>
                SIGN IN
              </Button>
            </Form>
            <div className={classes.registerLink}>
              <small>
                Create an account? <a href="/register">Sign up</a>
              </small>
            </div>
          </Card>
        </Container>
      </div>
  );
};

export default Login;
