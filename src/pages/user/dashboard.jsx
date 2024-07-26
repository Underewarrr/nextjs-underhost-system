import { useEffect } from "react";
import { useRouter } from "next/router";
import { Container, Row, Col, Button } from "react-bootstrap";
import Navigation from "../../components/Navbar";

const Dashboard = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/user/login");
  };

  const handleAdminPanel = () => {
    router.push("/admin");
  };

  return (
    <>
      <Container className="dashboard-container">
        <Row>
          <Col>
            <h1>Dashboard</h1>
            <div className="button-group">
              <Button variant="primary" onClick={handleLogout} style={{ marginRight: "10px" }}>
                Logout
              </Button>
              
            </div>
          </Col>
        </Row>
      </Container>
      <style jsx>{`
        .dashboard-container {
          margin-top: 50px;
        }
        .button-group {
          margin-top: 20px;
        }
      `}</style>
    </>
  );
};

export default Dashboard;
