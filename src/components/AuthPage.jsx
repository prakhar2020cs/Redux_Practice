import { useState } from "react";
import { Tabs, Tab, Form, Button, Container, Alert } from "react-bootstrap";
import axios from "axios";
import { backendUrl } from "../util";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");

  // Shared form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = activeTab === "login" ? `${backendUrl}/api/login` : `${backendUrl}/api/register`;

    try {
      const res = await axios.post(endpoint, { email, password },  { withCredentials: true });
      setMessage(res.data.message || `${activeTab} successful!`);
      navigate("/products");
    } catch (err) {
      setMessage(err.response?.data?.error || `${activeTab} failed.`);
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: "400px" }}>
      <Tabs
        id="auth-tabs"
        activeKey={activeTab}
        onSelect={(k) => {
          setActiveTab(k);
          setMessage("");
        }}
        className="mb-3"
      >
        <Tab eventKey="login" title="Login">
          <AuthForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            onSubmit={handleSubmit}
            message={message}
            tab="Login"
          />
        </Tab>
        <Tab eventKey="register" title="Register">
          <AuthForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            onSubmit={handleSubmit}
            message={message}
            tab="Register"
          />
        </Tab>
      </Tabs>
    </Container>
  );
}

function AuthForm({ email, setEmail, password, setPassword, onSubmit, message, tab }) {
  return (
    <>
      {message && <Alert variant="info">{message}</Alert>}
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            value={email}
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          {tab}
        </Button>
      </Form>
    </>
  );
}
