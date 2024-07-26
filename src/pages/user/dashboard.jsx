import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Container, Row, Col, Card, Button, ListGroup, Modal, ProgressBar, Accordion, Navbar, Nav } from "react-bootstrap";
import { FaServer, FaCogs, FaChevronLeft, FaChevronRight, FaFileAlt, FaEnvelope, FaGlobe, FaFolderOpen, FaTerminal, FaPowerOff, FaPlay, FaRedo } from "react-icons/fa";
import Navigation from "../../components/Navbar";

const Dashboard = () => {
  const router = useRouter();
  const [currentPlan, setCurrentPlan] = useState(null);
  const [serverStats, setServerStats] = useState({});
  const [vpsDetails, setVpsDetails] = useState([]);
  const [websiteDetails, setWebsiteDetails] = useState([]);
  const [activeSection, setActiveSection] = useState('website');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({});

  useEffect(() => {
    // Mock fetching data - replace with actual API calls
    setCurrentPlan({
      name: "Plano Padrão",
      price: "R$ 50,00/mês",
      features: ["50 GB SSD", "100 Sites", "100 Databases", "100 SSL Certificados"],
    });

    setServerStats({
      cpuUsage: 20,
      memoryUsage: 45,
      diskUsage: 60,
      uptime: "99.9%",
    });

    setVpsDetails([
      { id: 1, name: "VPS 1", ip: "192.168.1.1", status: "Running", cpu: 2, ram: 4, storage: 50 },
      { id: 2, name: "VPS 2", ip: "192.168.1.2", status: "Stopped", cpu: 4, ram: 8, storage: 100 },
    ]);

    setWebsiteDetails([
      { id: 1, name: "Website 1", domain: "example.com", status: "Active" },
      { id: 2, name: "Website 2", domain: "example.org", status: "Inactive" },
    ]);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/user/login");
  };

  const handleAdminPanel = () => {
    router.push("/admin");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const openModal = (content) => {
    setModalContent(content);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleServiceAction = (vpsId, action) => {
    // Mock action handling
    console.log(`Performing ${action} on VPS ID: ${vpsId}`);
    // Implement actual service action logic here
  };

  return (
    <>
      <Navigation/>
      <div className="dashboard-layout">
        <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
          <h3>Painel de Controle</h3>
          <ListGroup variant="flush">
            <ListGroup.Item action onClick={() => setActiveSection('website')} active={activeSection === 'website'}>
              <FaServer /> Hospedagem de Sites
            </ListGroup.Item>
            <ListGroup.Item action onClick={() => setActiveSection('vps')} active={activeSection === 'vps'}>
              <FaCogs /> Gerenciamento de VPS
            </ListGroup.Item>
            <ListGroup.Item action onClick={handleLogout}><FaChevronLeft /> Sair</ListGroup.Item>
          </ListGroup>
        </div>
        <Button variant="light" className="toggle-btn" onClick={toggleSidebar}>
          {isSidebarOpen ? <FaChevronLeft /> : <FaChevronRight />}
        </Button>
        <Container className="dashboard-container">
          <Row>
            <Col>
              <h1>Bem-vindo ao Painel de Controle Under Host V1</h1>
              
            </Col>
          </Row>
          {activeSection === 'website' && (
            <Row className="mt-4">
              <Col md={6}>
                <Card className="mb-4">
                  <Card.Header><h3>Plano Atual</h3></Card.Header>
                  <Card.Body>
                    {currentPlan ? (
                      <div>
                        <h4>{currentPlan.name}</h4>
                        <p>Preço: {currentPlan.price}</p>
                        <ListGroup variant="flush">
                          {currentPlan.features.map((feature, index) => (
                            <ListGroup.Item key={index}>{feature}</ListGroup.Item>
                          ))}
                        </ListGroup>
                      </div>
                    ) : (
                      <p>Carregando informações do plano...</p>
                    )}
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card className="mb-4">
                  <Card.Header><h3>Estatísticas do Servidor</h3></Card.Header>
                  <Card.Body>
                    <ListGroup variant="flush">
                      <ListGroup.Item>Uso de CPU: <ProgressBar now={serverStats.cpuUsage} label={`${serverStats.cpuUsage}%`} /></ListGroup.Item>
                      <ListGroup.Item>Uso de Memória: <ProgressBar now={serverStats.memoryUsage} label={`${serverStats.memoryUsage}%`} /></ListGroup.Item>
                      <ListGroup.Item>Uso de Disco: <ProgressBar now={serverStats.diskUsage} label={`${serverStats.diskUsage}%`} /></ListGroup.Item>
                      <ListGroup.Item>Uptime: {serverStats.uptime}</ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}
          {activeSection === 'website' && (
            <Row className="mt-4">
              <Col>
                <Accordion defaultActiveKey="0">
                  {websiteDetails.map((website, index) => (
                    <Accordion.Item eventKey={index.toString()} key={website.id}>
                      <Accordion.Header>{website.name} - {website.domain}</Accordion.Header>
                      <Accordion.Body>
                        <ListGroup variant="flush">
                          <ListGroup.Item>Status: {website.status}</ListGroup.Item>
                          <ListGroup.Item>Domínio: {website.domain}</ListGroup.Item>
                          <ListGroup.Item>
                            <Button variant="info" onClick={() => openModal({ title: `Gerenciador de Arquivos para ${website.name}`, content: "Interface de gerenciamento de arquivos." })}><FaFolderOpen /> Gerenciador de Arquivos</Button>
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <Button variant="info" onClick={() => openModal({ title: `Gerenciamento de E-mails para ${website.name}`, content: "Interface de gerenciamento de e-mails." })}><FaEnvelope /> Gerenciamento de E-mails</Button>
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <Button variant="info" onClick={() => openModal({ title: `Gerenciamento de Domínios para ${website.name}`, content: "Interface de gerenciamento de domínios." })}><FaGlobe /> Gerenciamento de Domínios</Button>
                          </ListGroup.Item>
                          <ListGroup.Item className="service-controls">
                            <Button variant="success" onClick={() => handleServiceAction(website.id, 'start')}><FaPlay /> Iniciar</Button>
                            <Button variant="warning" onClick={() => handleServiceAction(website.id, 'restart')}><FaRedo /> Reiniciar</Button>
                            <Button variant="danger" onClick={() => handleServiceAction(website.id, 'stop')}><FaPowerOff /> Parar</Button>
                          </ListGroup.Item>
                        </ListGroup>
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </Col>
            </Row>
          )}
          {activeSection === 'vps' && (
            <Row className="mt-4">
              <Col>
                <Accordion defaultActiveKey="0">
                  {vpsDetails.map((vps, index) => (
                    <Accordion.Item eventKey={index.toString()} key={vps.id}>
                      <Accordion.Header>{vps.name} - {vps.status}</Accordion.Header>
                      <Accordion.Body>
                        <ListGroup variant="flush">
                          <ListGroup.Item>IP: {vps.ip}</ListGroup.Item>
                          <ListGroup.Item>CPU: {vps.cpu} Cores</ListGroup.Item>
                          <ListGroup.Item>RAM: {vps.ram} GB</ListGroup.Item>
                          <ListGroup.Item>Storage: {vps.storage} GB</ListGroup.Item>
                          <ListGroup.Item>
                            <Button variant="info" onClick={() => openModal({ title: `Gerenciador de Arquivos para ${vps.name}`, content: "Interface de gerenciamento de arquivos." })}><FaFolderOpen /> Gerenciador de Arquivos</Button>
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <Button variant="info" onClick={() => openModal({ title: `Terminal SSH para ${vps.name}`, content: "Interface de terminal SSH." })}><FaTerminal /> Terminal SSH</Button>
                          </ListGroup.Item>
                          <ListGroup.Item className="service-controls">
                            <Button variant="success" onClick={() => handleServiceAction(vps.id, 'start')}><FaPlay /> Iniciar</Button>
                            <Button variant="warning" onClick={() => handleServiceAction(vps.id, 'restart')}><FaRedo /> Reiniciar</Button>
                            <Button variant="danger" onClick={() => handleServiceAction(vps.id, 'stop')}><FaPowerOff /> Parar</Button>
                          </ListGroup.Item>
                        </ListGroup>
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </Col>
            </Row>
          )}
        </Container>
        <Modal show={showModal} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>{modalContent.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {modalContent.content}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Fechar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <style jsx>{`
        .dashboard-layout {
          display: flex;
          min-height: 100vh;
          margin-top: 56px; /* Ensures content is not hidden under the fixed navbar */
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
        .sidebar h3 {
          margin-bottom: 20px;
        }
        .toggle-btn {
          position: fixed;
          top: 20px;
          left: ${isSidebarOpen ? '250px' : '0'};
          z-index: 2;
          border-radius: 50%;
          background-color: #fff;
          padding: 5px 10px;
          border: 1px solid #ddd;
        }
        .dashboard-container {
          flex: 1;
          padding-top: 20px;
          padding-left: ${isSidebarOpen ? '250px' : '50px'};
          transition: padding-left 0.3s ease-in-out;
        }
        .button-group {
          margin-top: 20px;
        }
        .service-controls button {
          margin-right: 10px;
          margin-top: 10px;
        }
      `}</style>
    </>
  );
};

export default Dashboard;
