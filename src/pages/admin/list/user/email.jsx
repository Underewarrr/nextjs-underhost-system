import { useEffect, useState } from "react";
import { Container, Row, Col, Table, Button, Modal } from "react-bootstrap";
import Navigation from "../../../../components/Navbar";

const UserEmailList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("key");
        if (!token) {
          throw new Error("No token found");
        }

        const response = await fetch("/api/admin/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
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

  const handleMoreDetails = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  return (
    <>
      <Navigation />
      <Container className="user-email-list-container">
        <Row>
          <Col>
            <h1>User Email List</h1>
            {error && <p className="error-message">{error}</p>}
            {users.length > 0 ? (
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user.id}>
                      <td>{index + 1}</td>
                      <td>{user.email}</td>
                      <td>
                        <Button
                          variant="info"
                          onClick={() => handleMoreDetails(user)}
                        >
                          More Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <p>Loading...</p>
            )}
          </Col>
        </Row>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>User Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedUser && (
              <>
                <p><strong>Email:</strong> {selectedUser.email}</p>
                <p><strong>Username:</strong> {selectedUser.username}</p>
                <p><strong>Phone Number:</strong> {selectedUser.phoneNumber}</p>
                <p><strong>Country Code:</strong> {selectedUser.countryCode}</p>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
      <style jsx>{`
        .user-email-list-container {
          margin-top: 50px;
        }
        .error-message {
          color: red;
        }
      `}</style>
    </>
  );
};

export default UserEmailList;
