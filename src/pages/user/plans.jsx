import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Form, ListGroup } from "react-bootstrap";
import Image from "next/image";
import Navigation from "../../components/Navbar";
import { NextSeo } from "next-seo";
import footerImg from "../../imgs/altern-51.png";

const HostingPlans = () => {
  const [vpsCores, setVpsCores] = useState(2);
  const [vpsMemory, setVpsMemory] = useState(2);
  const [vpsStorage, setVpsStorage] = useState(30);
  const [isSSD, setIsSSD] = useState(true);
  const [additionalIPs, setAdditionalIPs] = useState(0);
  const [duration, setDuration] = useState(1); // 1 for monthly, 12 for annual

  const basePriceHD = 5.95;
  const corePrice = 5;
  const memoryPrice = 7;
  const storagePricePer10GB = 1.0;
  const ipPrice = 79.99; // Price per additional IP
  const storagePrice = Math.ceil(vpsStorage / 10) * storagePricePer10GB;
  const ssdMultiplier = isSSD ? 1.25 : 1;

  const vpsPrice =
    (basePriceHD + (vpsCores) * corePrice + (vpsMemory) * memoryPrice + storagePrice + additionalIPs * ipPrice) *
    ssdMultiplier;

  // Discounted prices for different durations
  const discounts = {
    basic: 14,
    standard: 25,
    premium: 33,
  };

  // VPS discounts based on the contract length
  const vpsDiscountRates = {
    3: 5, // 5% for 3-5 months
    6: 10, // 10% for 6-11 months
    12: 15, // 15% for 12-23 months
    24: 20, // 20% for 24-47 months
    48: 25, // 25% for 48+ months
  };

  // Determine the applicable discount rate based on duration
  const getVpsDiscountRate = (duration) => {
    if (duration >= 48) return vpsDiscountRates[48];
    if (duration >= 24) return vpsDiscountRates[24];
    if (duration >= 12) return vpsDiscountRates[12];
    if (duration >= 6) return vpsDiscountRates[6];
    if (duration >= 3) return vpsDiscountRates[3];
    return 0;
  };

  const vpsDiscountRate = getVpsDiscountRate(duration);
  const discountedVpsPrice = vpsPrice * (1 - vpsDiscountRate / 100);
  const totalVpsPriceBeforeDiscount = vpsPrice * duration;
  const totalVpsPriceAfterDiscount = discountedVpsPrice * duration;
  const totalSavings = totalVpsPriceBeforeDiscount - totalVpsPriceAfterDiscount;

  const plans = [
    { name: "Plano Básico", price: 20.99, discount: discounts.basic, cores: "1 vCore", ram: "Desempenho padrão", storage: "50 GB HD", domains: [".online", ".store"], databases: "1 database", websites: "1 Website", ssl: "1 ssl", bandwith: "100 GB Bandwidth", domainquanty: "Domínio Grátis : 1", email: "Email indisponível" },
    { name: "Plano Padrão", price: 35.00, discount: discounts.standard, cores: "1 vCores", ram: "Desempenho padrão", storage: "50 GB SSD", domains: [".online", ".store", ".tech", ".cloud", ".click", ".blog"], databases: "100 databases", websites: "100 Sites", ssl: "100 ssl", bandwith: "Banda Larga Ilimitada", domainquanty: "Domínio Grátis : 1", email: "1 Email" },
    { name: "Plano Premium", price: 50.00, discount: discounts.premium, cores: "2 vCores", ram: "Desempenho aprimorado (em até 5x)", storage: "150 GB HD/50 GB SSD", domains: [".online", ".store", ".tech", ".cloud", ".click", ".blog", ".com.br", ".com", ".org", ".top"], databases: "100 Databases", websites: "100 Sites", ssl: "100 ssl", bandwith: "Banda Larga Ilimitada", domainquanty: "Domínio Grátis : 1", email: "1 Email" },
  ];

  return (
    <>
      <NextSeo
        title="Planos de Hospedagem - Underhost"
        description="Descubra nossos planos de hospedagem imbatíveis para websites e VPS. A Underhost oferece opções flexíveis e acessíveis para atender às suas necessidades."
        canonical="https://www.underhost.com/"
        openGraph={{
          url: "https://www.underhost.com/",
          title: "Planos de Hospedagem Acessíveis - Underhost",
          description:
            "Escolha entre uma variedade de planos de hospedagem para websites e VPS na Underhost. Soluções flexíveis, confiáveis e econômicas para todas as suas necessidades de hospedagem.",
          images: [
            {
              url: "https://i.imgur.com/1FIUZZx.png",
              width: 179,
              height: 177,
              alt: "Banner Underhost",
              type: "image/png",
            },
          ],
          site_name: "Underhost",
        }}
      />
      <Navigation />
      <div style={{ backgroundColor: '#0E0E2F', minHeight: '100vh', paddingTop: '50px' }}>
        <Container className="pt-5">
          <h2 className="text-center mb-5 text-white">Nossos Planos de Hospedagem Websites</h2>
          <Row className="mb-5">
            {plans.map((plan, index) => (
              <Col md={4} key={index} className="mb-4">
                <Card className="text-center plan-card">
                  <Card.Header className="plan-header">
                    {plan.name}
                  </Card.Header>
                  <Card.Body className="plan-body">
                    <Form.Group controlId={`durationSelect-${index}`}>
                      <Form.Label>Duração do Plano</Form.Label>
                      <Form.Control as="select" value={duration} onChange={(e) => setDuration(Number(e.target.value))}>
                        <option value={1}>1 mês</option>
                        <option value={12}>12 meses</option>
                      </Form.Control>
                    </Form.Group>
                    <Card.Title className="plan-price">
                      {duration === 12 ? (
                        <>
                          R$ {((plan.price - plan.discount) * 12).toFixed(2)} (pague anualmente)
                        </>
                      ) : (
                        <>
                          R$ {(plan.price).toFixed(2)}/mês
                        </>
                      )}
                    </Card.Title>
                    {duration === 12 && (
                      <Card.Text className="text-success">
                        Economize R$ {(plan.discount * 12).toFixed(2)} ao escolher o plano anual!
                      </Card.Text>
                    )}
                    <ListGroup variant="flush" className="mt-3">
                      <ListGroup.Item>{plan.websites}</ListGroup.Item>
                      <ListGroup.Item>{plan.ram}</ListGroup.Item>
                      <ListGroup.Item>{plan.storage}</ListGroup.Item>
                      <ListGroup.Item>{plan.bandwith}</ListGroup.Item>
                      <ListGroup.Item>{plan.ssl}</ListGroup.Item>
                      <ListGroup.Item>{plan.databases}</ListGroup.Item>
                      <ListGroup.Item>{plan.email}</ListGroup.Item>
                    </ListGroup>
                    <div className="domains mt-3">
                      <strong>Domínios Incluídos: (1)</strong>
                      <div className="domain-list">
                        {plan.domains.map((domain, idx) => (
                          <span key={idx} className="domain-item">{domain}</span>
                        ))}
                      </div>
                    </div>
                    <Button variant="primary" className="mt-3">Escolher Plano</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <h2 className="text-center mb-4 text-white">Hospedagem VPS</h2>
          <Row className="justify-content-center">
            <Col md={6}>
              <Card className="plan-card">
                <Card.Header className="text-center plan-header">
                  Plano VPS Personalizado
                </Card.Header>
                <Card.Body className="plan-body">
                  <Form>
                    <Form.Group controlId="vpsCores">
                      <Form.Label>vCores</Form.Label>
                      <Form.Control
                        type="number"
                        min="2"
                        value={vpsCores}
                        onChange={(e) => setVpsCores(Number(e.target.value))}
                      />
                    </Form.Group>
                    <Form.Group controlId="vpsMemory">
                      <Form.Label>Memória (GB)</Form.Label>
                      <Form.Control
                        type="number"
                        min="2"
                        value={vpsMemory}
                        onChange={(e) => setVpsMemory(Number(e.target.value))}
                      />
                    </Form.Group>
                    <Form.Group controlId="vpsStorage">
                      <Form.Label>Armazenamento (GB)</Form.Label>
                      <Form.Control
                        type="number"
                        min="30"
                        value={vpsStorage}
                        onChange={(e) => setVpsStorage(Number(e.target.value))}
                      />
                    </Form.Group>
                    <Form.Group controlId="storageType">
                      <Form.Check
                        type="radio"
                        label="SSD"
                        name="storageType"
                        checked={isSSD}
                        onChange={() => setIsSSD(true)}
                      />
                      <Form.Check
                        type="radio"
                        label="HD"
                        name="storageType"
                        checked={!isSSD}
                        onChange={() => setIsSSD(false)}
                      />
                    </Form.Group>
                    <Form.Group controlId="additionalIPs">
                      <Form.Label>IPs Adicionais</Form.Label>
                      <Form.Control
                        type="number"
                        min="0"
                        value={additionalIPs}
                        onChange={(e) => setAdditionalIPs(Number(e.target.value))}
                      />
                    </Form.Group>
                    <Form.Group controlId="durationSelectVPS">
                      <Form.Label>Duração do Plano VPS</Form.Label>
                      <Form.Control as="select" value={duration} onChange={(e) => setDuration(Number(e.target.value))}>
                        <option value={1}>1 mês</option>
                        <option value={3}>3 meses</option>
                        <option value={6}>6 meses</option>
                        <option value={12}>12 meses</option>
                        <option value={24}>24 meses</option>
                        <option value={48}>48 meses</option>
                      </Form.Control>
                    </Form.Group>
                    <h5>Preço Total: R$ {totalVpsPriceBeforeDiscount.toFixed(2)}</h5>
                    {vpsDiscountRate > 0 && (
                      <>
                        <Card.Text className="text-success">
                          Desconto de {vpsDiscountRate}% aplicado! Economize R$ {totalSavings.toFixed(2)}.
                        </Card.Text>
                        <h5>Preço com Desconto: R$ {totalVpsPriceAfterDiscount.toFixed(2)}</h5>
                      </>
                    )}
                    <Button variant="primary">Escolher Plano VPS</Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <footer className="text-center py-4 text-white" style={{ backgroundColor: '#0E0E2F' }}>
        <Image src={footerImg} alt="Imagem do Rodapé" width={40} height={40} />
        <p>© 2024 Underhost. Todos os direitos reservados.</p>
      </footer>

      <style jsx>{`
        .plan-card {
          border-radius: 15px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .plan-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.4);
        }

        .plan-header {
          background-color: #4e54c8;
          color: #fff;
          border-radius: 15px 15px 0 0;
          padding: 15px;
          font-size: 1.25rem;
        }

        .plan-body {
          background-color: #ffffff;
          color: #000;
          border-radius: 0 0 15px 15px;
          padding: 20px;
        }

        .plan-price {
          font-size: 1.5rem;
          margin-bottom: 10px;
        }

        .text-success {
          color: #28a745;
          font-weight: bold;
        }

        .domains {
          text-align: left;
          margin-top: 15px;
        }

        .domain-list {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          margin-top: 10px;
        }

        .domain-item {
          background-color: #f0f0f0;
          border-radius: 5px;
          padding: 5px 10px;
          font-size: 0.9rem;
          color: #333;
        }
      `}</style>
    </>
  );
};

export default HostingPlans;
