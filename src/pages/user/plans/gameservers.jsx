import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, ListGroup, Modal, Form } from "react-bootstrap";
import { FaServer, FaChevronLeft, FaChevronRight, FaInfoCircle, FaShoppingCart, FaPlay } from "react-icons/fa";
import Navigation from "../../../components/Navbar";
import ProtectedRoute from "../../../components/ProtectedRoute";

const ServerHostingPage = () => {
  const [serverDetails, setServerDetails] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedEngine, setSelectedEngine] = useState('');
  const [selectedVersion, setSelectedVersion] =useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedSlots, setSelectedSlots] = useState(25);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [monthlyPrice, setMonthlyPrice] = useState(0);
  const [initialSetupCost, setInitialSetupCost] = useState(0);
  const [additionalServices, setAdditionalServices] = useState({ installation: false, compilation: false });
  const [paymentServices, setPaymentServices] = useState({ MercadoPagoPix: false, MercadoPagoCC: false, PayPal: false, PicPayPix: false, PicPayCC: false, Binance: false });

  useEffect(() => {
    setServerDetails([
      {
        category: "Tibia",
        engines: [
          {
            name: "TFS",
            versions: [
              { version: "7.4", types: [{ name: "Global", pricePerSlot: 1.5 }, { name: "Baiak", pricePerSlot: 1.2 }] },
              { version: "12.41", types: [{ name: "Global", pricePerSlot: 1.7 }, { name: "Baiak", pricePerSlot: 1.4 }] }
            ]
          },
          {
            name: "OTX",
            versions: [
              { version: "7.5", types: [{ name: "Global", pricePerSlot: 1.6 }, { name: "Baiak", pricePerSlot: 1.3 }] },
              { version: "10.98", types: [{ name: "Global", pricePerSlot: 1.8 }, { name: "Baiak", pricePerSlot: 1.5 }] }
            ]
          },
          {
            name: "CANARY",
            versions: [
              { version: "12+", types: [{ name: "Global", pricePerSlot: 2.0 }] }
            ]
          }
        ]
      },
      {
        category: "Derivado",
        engines: [
          {
            name: "TFS",
            versions: [
              { version: "7.4", types: [{ name: "Narutibia", pricePerSlot: 1.0 }] },
              { version: "8.60", types: [{ name: "Poketibia", pricePerSlot: 1.3 }] },
              { version: "9.80", types: [{ name: "Poketibia", pricePerSlot: 1.4 }] },
              { version: "10.98", types: [{ name: "Poketibia", pricePerSlot: 1.5 }] }
            ]
          },
          {
            name: "OTX",
            versions: [
              { version: "8.7", types: [{ name: "Narutibia", pricePerSlot: 1.1 }] }
            ]
          }
        ]
      }
    ]);
  }, []);

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

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedEngine('');
    setSelectedVersion('');
    setSelectedType('');
    setMonthlyPrice(0);
    setInitialSetupCost(0);
  };

  const handleEngineChange = (e) => {
    setSelectedEngine(e.target.value);
    setSelectedVersion('');
    setSelectedType('');
    setMonthlyPrice(0);
    setInitialSetupCost(0);
  };

  const handleVersionChange = (e) => {
    setSelectedVersion(e.target.value);
    setSelectedType('');
    setMonthlyPrice(0);
    setInitialSetupCost(0);
  };

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
    updatePrices(selectedCategory, selectedEngine, selectedVersion, e.target.value, selectedSlots, additionalServices, paymentServices);
  };

  const handleSlotsChange = (e) => {
    setSelectedSlots(Number(e.target.value));
    updatePrices(selectedCategory, selectedEngine, selectedVersion, selectedType, Number(e.target.value), additionalServices, paymentServices);
  };

  const handleAdditionalServicesChange = (e) => {
    const { name, checked } = e.target;
    setAdditionalServices({ ...additionalServices, [name]: checked });
    updatePrices(selectedCategory, selectedEngine, selectedVersion, selectedType, selectedSlots, { ...additionalServices, [name]: checked }, paymentServices);
  };

  const handlePaymentServicesChange = (e) => {
    const { name, checked } = e.target;
    setPaymentServices({ ...paymentServices, [name]: checked });
    updatePrices(selectedCategory, selectedEngine, selectedVersion, selectedType, selectedSlots, additionalServices, { ...paymentServices, [name]: checked });
  };

  const updatePrices = (category, engine, version, type, slots, services, payments) => {
    const server = serverDetails.find(s => s.category === category);
    if (!server) return;

    const eng = server.engines.find(e => e.name === engine);
    if (!eng) return;

    const ver = eng.versions.find(v => v.version === version);
    if (!ver) return;

    const selectedType = ver.types.find(t => t.name === type);
    if (!selectedType) return;

    const calculatedMonthlyPrice = selectedType.pricePerSlot * slots;
    let calculatedInitialSetupCost = 0;

    if (services.installation) calculatedInitialSetupCost += 150;
    if (services.compilation) calculatedInitialSetupCost += 30;

    if (payments.MercadoPagoPix) calculatedInitialSetupCost += 80;
    if (payments.MercadoPagoCC) calculatedInitialSetupCost += 80;
    if (payments.PayPal) calculatedInitialSetupCost += 150;
    if (payments.PicPayPix) calculatedInitialSetupCost += 80;
    if (payments.PicPayCC) calculatedInitialSetupCost += 80;
    if (payments.Binance) calculatedInitialSetupCost += 350;

    setMonthlyPrice(calculatedMonthlyPrice);
    setInitialSetupCost(calculatedInitialSetupCost);
  };

  const getEnginesForCategory = (category) => {
    const server = serverDetails.find(server => server.category === category);
    return server ? server.engines : [];
  };

  const getVersionsForEngine = (category, engine) => {
    const server = serverDetails.find(server => server.category === category);
    if (server) {
      const eng = server.engines.find(eng => eng.name === engine);
      return eng ? eng.versions : [];
    }
    return [];
  };

  const getTypesForVersion = (category, engine, version) => {
    const server = serverDetails.find(server => server.category === category);
    if (server) {
      const eng = server.engines.find(eng => eng.name === engine);
      if (eng) {
        const ver = eng.versions.find(ver => ver.version === version);
        return ver ? ver.types : [];
      }
    }
    return [];
  };

  return (
    <>
      <ProtectedRoute>
        <Navigation />
        <div className="page-layout">
          <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
            <h3>Servidores de Tibia</h3>
            <ListGroup variant="flush">
              <ListGroup.Item action onClick={() => setSelectedCategory('Tibia')} active={selectedCategory === 'Tibia'}>
                Tibia
              </ListGroup.Item>
              <ListGroup.Item action onClick={() => setSelectedCategory('Derivado')} active={selectedCategory === 'Derivado'}>
                Derivado
              </ListGroup.Item>
            </ListGroup>
          </div>
          <Button variant="light" className="toggle-btn" onClick={toggleSidebar}>
            {isSidebarOpen ? <FaChevronLeft /> : <FaChevronRight />}
          </Button>
          <Container className="content-container">
            <Row>
              <Col>
                <h1>Serviços de Hospedagem de Servidores</h1>
                <p>Escolha o servidor perfeito para sua comunidade de jogadores de Tibia ou derivados.</p>
              </Col>
            </Row>
            {selectedCategory && (
              <Row className="mt-4">
                <Col md={6}>
                  <Card className="mb-4">
                    <Card.Header><h3>Configuração do Servidor</h3></Card.Header>
                    <Card.Body>
                      <Form.Group>
                        <Form.Label>Engine</Form.Label>
                        <Form.Control as="select" value={selectedEngine} onChange={handleEngineChange}>
                          <option value="">Selecione uma engine</option>
                          {getEnginesForCategory(selectedCategory).map((eng, index) => (
                            <option key={index} value={eng.name}>{eng.name}</option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                      {selectedEngine && (
                        <Form.Group>
                          <Form.Label>Versão</Form.Label>
                          <Form.Control as="select" value={selectedVersion} onChange={handleVersionChange}>
                            <option value="">Selecione uma versão</option>
                            {getVersionsForEngine(selectedCategory, selectedEngine).map((ver, index) => (
                              <option key={index} value={ver.version}>{ver.version}</option>
                            ))}
                          </Form.Control>
                        </Form.Group>
                      )}
                      {selectedVersion && (
                        <Form.Group>
                          <Form.Label>Tipo</Form.Label>
                          <Form.Control as="select" value={selectedType} onChange={handleTypeChange}>
                            <option value="">Selecione um tipo</option>
                            {getTypesForVersion(selectedCategory, selectedEngine, selectedVersion).map((type, index) => (
                              <option key={index} value={type.name}>{type.name}</option>
                            ))}
                          </Form.Control>
                        </Form.Group>
                      )}
                      {selectedType && (
                        <>
                          <Form.Group>
                            <Form.Label>Slots</Form.Label>
                            <Form.Control as="select" value={selectedSlots} onChange={handleSlotsChange}>
                              {[25, 50, 75, 100, 150, 200, 300, 500].map((slot) => (
                                <option key={slot} value={slot}>{slot} slots</option>
                              ))}
                            </Form.Control>
                          </Form.Group>
                          <Form.Group>
                            <Form.Label>Serviços Opcionais</Form.Label>
                            <Form.Check 
                              type="checkbox"
                              label="Instalação (+R$ 150,00)"
                              name="installation"
                              checked={additionalServices.installation}
                              onChange={handleAdditionalServicesChange}
                            />
                            
                          </Form.Group>
                          <ListGroup variant="flush">
                            <ListGroup.Item>Nome da Engine: {selectedEngine}</ListGroup.Item>
                            <ListGroup.Item>Versão: {selectedVersion}</ListGroup.Item>
                            <ListGroup.Item>Tipo: {selectedType}</ListGroup.Item>
                            <ListGroup.Item>Slots: {selectedSlots}</ListGroup.Item>
                            <ListGroup.Item>
                              <Button variant="info" onClick={() => openModal({ title: `Detalhes do Servidor ${selectedEngine}`, content: "Informações detalhadas sobre o servidor." })}><FaInfoCircle /> Mais Detalhes</Button>
                              <Button variant="success" className="ml-2"><FaPlay /> Testar Agora</Button>
                            </ListGroup.Item>
                          </ListGroup>
                        </>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
                {selectedType && (
                  <Col md={6}>
                    <Card className="mb-4">
                      <Card.Header><h3>Visualização do Mapa</h3></Card.Header>
                      <Card.Body>
                        <img src={`https://example.com/maps/${selectedEngine}_${selectedVersion}.jpg`} alt={`Mapa de ${selectedEngine}`} className="img-fluid" />
                      </Card.Body>
                    </Card>
                    <Card className="mb-4">
                      <Card.Header><h3>Preço</h3></Card.Header>
                      <Card.Body>
                        <h4>Mensal: R$ {monthlyPrice.toFixed(2)}</h4>
                        <h4>Configuração Inicial: R$ {initialSetupCost.toFixed(2)}</h4>
                        <Button variant="primary"><FaShoppingCart /> Comprar Agora</Button>
                      </Card.Body>
                    </Card>
                  </Col>
                )}
                {selectedType && (
                  <Col md={12}>
                    <Card className="mb-4">
                      <Card.Header><h3>Configuração do Website (AAC)</h3></Card.Header>
                      <Card.Body>
                        <Form.Group>
                          <Form.Label>Selecione um AAC</Form.Label>
                          <Form.Control as="select" defaultValue="MyAAC">
                            <option value="MyAAC">MyAAC</option>
                            {/* Adicionar mais opções de AAC conforme necessário */}
                          </Form.Control>
                        </Form.Group>
                        <p>MyAAC suporta todas as versões selecionadas para o servidor.</p>
                        <Form.Group>
                          <Form.Label>Serviços Opcionais de Pagamento</Form.Label>
                          <Form.Check 
                            type="checkbox"
                            label="Pagamento Automático MercadoPago (Pix: R$ 80,00)"
                            name="MercadoPagoPix"
                            checked={paymentServices.MercadoPagoPix}
                            onChange={handlePaymentServicesChange}
                          />
                          <Form.Check 
                            type="checkbox"
                            label="Pagamento Automático MercadoPago (CC: R$ 80,00)"
                            name="MercadoPagoCC"
                            checked={paymentServices.MercadoPagoCC}
                            onChange={handlePaymentServicesChange}
                          />
                          <Form.Check 
                            type="checkbox"
                            label="Pagamento Automático PayPal (R$ 150,00)"
                            name="PayPal"
                            checked={paymentServices.PayPal}
                            onChange={handlePaymentServicesChange}
                          />
                          <Form.Check 
                            type="checkbox"
                            label="Pagamento Automático PicPay (Pix: R$ 80,00)"
                            name="PicPayPix"
                            checked={paymentServices.PicPayPix}
                            onChange={handlePaymentServicesChange}
                          />
                          <Form.Check 
                            type="checkbox"
                            label="Pagamento Automático PicPay (CC: R$ 80,00)"
                            name="PicPayCC"
                            checked={paymentServices.PicPayCC}
                            onChange={handlePaymentServicesChange}
                          />
                          <Form.Check 
                            type="checkbox"
                            label="Pagamento Automático Binance (R$ 350,00)"
                            name="Binance"
                            checked={paymentServices.Binance}
                            onChange={handlePaymentServicesChange}
                          />
                        </Form.Group>
                      </Card.Body>
                    </Card>
                  </Col>
                )}
              </Row>
            )}
          </Container>
          <Modal show={showModal} onHide={closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>{modalContent.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{modalContent.content}</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeModal}>Fechar</Button>
            </Modal.Footer>
          </Modal>
        </div>
        <style jsx>{`
          .page-layout {
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
          .content-container {
            flex: 1;
            padding-top: 20px;
            padding-left: ${isSidebarOpen ? '250px' : '50px'};
            transition: padding-left 0.3s ease-in-out;
          }
          .img-fluid {
            max-width: 100%;
            height: auto;
          }
        `}</style>
      </ProtectedRoute>
    </>
  );
};

export default ServerHostingPage;
