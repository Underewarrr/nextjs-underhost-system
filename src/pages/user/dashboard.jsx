import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, ListGroup } from "react-bootstrap";
import { FaServer, FaCogs, FaChevronLeft, FaChevronRight, FaMoneyCheckAlt, FaTrash } from "react-icons/fa";
import Navigation from "../../components/Navbar";
import ProtectedRoute from "../../components/ProtectedRoute";
import QRCode from "qrcode.react";
import Script from "next/script";

const Dashboard = () => {
  const [vpsOrders, setVpsOrders] = useState([]);
  const [activeSection, setActiveSection] = useState("vpsOrders");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const fetchVpsOrders = async () => {
      try {
        const response = await fetch("/api/vps/orders");
        if (response.ok) {
          const data = await response.json();
          setVpsOrders(data);
        } else {
          console.error("Erro ao buscar pedidos de VPS.");
        }
      } catch (error) {
        console.error("Erro na chamada à API:", error);
      }
    };

    fetchVpsOrders();
  }, []);

  const handleDeleteOrder = async (orderId) => {
    try {
      const response = await fetch(`/api/vps/${orderId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setVpsOrders(vpsOrders.filter((order) => order.id !== orderId));
        alert("Pedido excluído com sucesso.");
      } else {
        const errorData = await response.json();
        alert(`Erro ao excluir o pedido: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Erro ao excluir o pedido:", error);
      alert("Erro ao excluir o pedido.");
    }
  };

  return (
    <>
      <ProtectedRoute>
        <Navigation />
        <div className="dashboard-layout">
          <div className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
            <h3>Painel de Controle</h3>
            <ListGroup variant="flush">
              <ListGroup.Item
                action
                onClick={() => setActiveSection("vpsOrders")}
                active={activeSection === "vpsOrders"}
              >
                <FaMoneyCheckAlt /> Pedidos de VPS
              </ListGroup.Item>
              <ListGroup.Item
                action
                onClick={() => setActiveSection("vps")}
                active={activeSection === "vps"}
              >
                <FaCogs /> Gerenciamento de VPS
              </ListGroup.Item>
            </ListGroup>
          </div>
          <Button variant="light" className="toggle-btn" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <FaChevronLeft /> : <FaChevronRight />}
          </Button>
          <Container className="dashboard-container">
            <Row>
              <Col>
                <h1>Painel de Controle Under Host V1</h1>
              </Col>
            </Row>
            {activeSection === "vpsOrders" && (
              <Row className="mt-4">
                <Col>
                  <h3>Pedidos de VPS</h3>
                  <ListGroup variant="flush">
                    {vpsOrders.map((order) => (
                      <ListGroup.Item key={order.id}>
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h5>Pedido #{order.id}</h5>
                            <p>Status: {order.isPaid ? "Pago" : "Não Pago"}</p>
                            <p>Data do Pedido: {new Date(order.createdAt).toLocaleDateString()}</p>
                            <p>vCores: {order.vpsCores}</p>
                            <p>Memória: {order.vpsMemory} GB</p>
                            <p>Armazenamento: {order.vpsStorage} GB</p>
                            <p>Tipo de Armazenamento: {order.isSSD ? "SSD" : "HD"}</p>
                            <p>IPs Adicionais: {order.additionalIPs}</p>
                            <p>Duração: {order.duration} meses</p>
                            <p>Preço Total: R$ {order.totalPrice.toFixed(2)}</p>
                            {!order.isPaid && order.initPoint && (
                              <>
                                <h6 className="text-danger">Pagamento Pendente</h6>
                                <div>
                                  <QRCode value={order.initPoint} size={150} />
                                  <p className="mt-2">
                                    <a
                                      href={order.initPoint}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      Clique aqui para realizar o pagamento
                                    </a>
                                  </p>
                                </div>
                              </>
                            )}
                            {order.isPaid ? (
                              <p className="text-success">VPS Disponível!</p>
                            ) : (
                              <p className="text-warning">VPS Indisponível até o pagamento ser confirmado.</p>
                            )}
                          </div>
                          <Button variant="danger" onClick={() => handleDeleteOrder(order.id)}>
                            <FaTrash />
                          </Button>
                        </div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Col>
              </Row>
            )}
            {activeSection === "vps" && (
              <Row className="mt-4">
                <Col>
                  <h3>Gerenciamento de VPS</h3>
                  <ListGroup variant="flush">
                    {vpsOrders
                      .filter((order) => order.isPaid)
                      .map((vps) => (
                        <ListGroup.Item key={vps.id}>
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <h5>{vps.vpsName || `VPS Pedido #${vps.id}`}</h5>
                              <p>IP: {vps.ip}</p>
                              <p>Status: Ativo</p>
                              <p>CPU: {vps.vpsCores} vCPUs</p>
                              <p>RAM: {vps.vpsMemory} GB</p>
                              <p>Armazenamento: {vps.vpsStorage} GB</p>
                            </div>
                          </div>
                        </ListGroup.Item>
                      ))}
                  </ListGroup>
                </Col>
              </Row>
            )}
          </Container>
        </div>
      </ProtectedRoute>
      <style jsx>{`
        .dashboard-layout {
          display: flex;
          min-height: 100vh;
          margin-top: 56px;
        }
        .sidebar {
          width: 250px;
          background-color: #0E0E2F;
          color: white;
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: start;
          justify-content: start;
          transition: transform 0.3s ease-in-out;
          position: relative;
          z-index: 1;
        }
        .sidebar.closed {
          transform: translateX(-250px);
        }
        .sidebar.open {
          transform: translateX(0);
        }
        .toggle-btn {
          position: absolute;
          top: 20px;
          right: -30px;
          z-index: 2;
        }
        .dashboard-container {
          flex: 1;
          padding: 20px;
          margin-left: 250px;
          transition: margin-left 0.3s ease-in-out;
        }
        .sidebar.closed ~ .dashboard-container {
          margin-left: 0;
        }
        .dashboard-container h3 {
          margin-top: 20px;
          margin-bottom: 10px;
        }
        a {
          color: #007bff;
        }
        a:hover {
          color: #0056b3;
          text-decoration: underline;
        }
      `}</style>
      <Script src="https://sdk.mercadopago.com/js/v2" strategy="afterInteractive" />
    </>
  );
};

export default Dashboard;
