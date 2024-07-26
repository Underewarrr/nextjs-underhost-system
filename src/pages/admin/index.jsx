import { useEffect, useState } from "react";
import { Container, Row, Col, Table, Button, Form } from "react-bootstrap";
import Navigation from "../../components/Navbar";
import { useRouter } from "next/router";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("key");
        if (!token) {
          throw new Error("No token found");
        }

        const response = await fetch("/api/admin/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch users");
        }

        const data = await response.json();
        setUsers(data);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to load user data. Please try again.");
      }
    };

    fetchUsers();
  }, []);

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("key");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await fetch("/api/admin/addAdmin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add admin");
      }

      const result = await response.json();
      setMessage(result.message);
      setEmail(""); // Clear the input field

      // Refresh the users list
      fetchUsers();
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to add admin. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("key");
    router.push("/login");
  };

  return (
    <>
      <Navigation />
      <Container className="admin-container">
        <Row>
          <Col>
            <h1>Admin Panel</h1>
            {error && <p className="error-message">{error}</p>}
            {message && <p className="success-message">{message}</p>}
            <Form onSubmit={handleAddAdmin} className="add-admin-form">
              <Form.Group controlId="formEmail">
                <Form.Label>Email address to make admin</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Add Admin
              </Button>
            </Form>
            {users.length > 0 ? (
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Email</th>
                    <th>Username</th>
                    <th>Phone Number</th>
                    <th>Country Code</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user.id}>
                      <td>{index + 1}</td>
                      <td>{user.email}</td>
                      <td>{user.username}</td>
                      <td>{user.phoneNumber}</td>
                      <td>{user.countryCode}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <p>Loading...</p>
            )}
            <Button variant="primary" onClick={handleLogout}>
              Logout
            </Button>
          </Col>
        </Row>
      </Container>
      <style jsx>{`
        .admin-container {
          margin-top: 50px;
        }
        .error-message {
          color: red;
        }
        .success-message {
          color: green;
        }
        .add-admin-form {
          margin-bottom: 20px;
        }
      `}</style>
    </>
  );
};

export default AdminPanel;
