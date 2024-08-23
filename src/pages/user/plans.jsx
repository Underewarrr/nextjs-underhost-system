import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import Image from "next/image";
import Navigation from "../../components/Navbar";
import { NextSeo } from "next-seo";
import footerImg from "../../imgs/altern-51.png";
import Script from "next/script";
import QRCode from "qrcode.react"; // Biblioteca para gerar o QR Code

const HostingPlans = () => {
  const [vpsCores, setVpsCores] = useState(2);
  const [vpsMemory, setVpsMemory] = useState(2);
  const [vpsStorage, setVpsStorage] = useState(30);
  const [isSSD, setIsSSD] = useState(true);
  const [additionalIPs, setAdditionalIPs] = useState(0);
  const [duration, setDuration] = useState(1); // 1 for monthly, 12 for annual
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [preferenceId, setPreferenceId] = useState(null); // Novo estado para armazenar o preferenceId
  const [initPoint, setInitPoint] = useState(""); // Novo estado para armazenar o init_point (URL do pagamento)

  const basePriceHD = 5.95;
  const corePrice = 5;
  const memoryPrice = 7;
  const storagePricePer10GB = 1.0;
  const ipPrice = 79.99; // Price per additional IP
  const storagePrice = Math.ceil(vpsStorage / 10) * storagePricePer10GB;
  const ssdMultiplier = isSSD ? 1.25 : 1;

  const vpsPrice =
    (basePriceHD + vpsCores * corePrice + vpsMemory * memoryPrice + storagePrice + additionalIPs * ipPrice) *
    ssdMultiplier;

  const vpsDiscountRates = {
    3: 5, // 5% for 3-5 months
    6: 10, // 10% for 6-11 months
    12: 15, // 15% for 12-23 months
    24: 20, // 20% for 24-47 months
    48: 25, // 25% for 48+ months
  };

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const userId = parseInt(localStorage.getItem("userId"), 10);

    if (isNaN(userId)) {
      setError("Invalid User ID. Please log in again.");
      setLoading(false);
      return;
    }

    const payload = {
      userId,
      vpsCores,
      vpsMemory,
      vpsStorage,
      isSSD,
      additionalIPs,
      duration,
      totalPrice: totalVpsPriceAfterDiscount,
    };

    try {
      const response = await fetch("/api/user/vps", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess(true);
        setPreferenceId(data.preferenceId); // Armazena o preferenceId
        setInitPoint(data.initPoint); // Armazena o init_point para gerar o QR Code
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setError("Failed to submit the request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
          <h2 className="text-center mb-4 text-white">Hospedagem VPS</h2>
          <Row className="justify-content-center">
            <Col md={6}>
              <Card className="plan-card">
                <Card.Header className="text-center plan-header">Plano VPS Personalizado</Card.Header>
                <Card.Body className="plan-body">
                  <Form onSubmit={handleSubmit}>
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
                    {error && <p className="text-danger">{error}</p>}
                    {success && <p className="text-success">Pedido de VPS enviado com sucesso!</p>}
                    <Button type="submit" variant="primary" disabled={loading}>
                      {loading ? "Processando..." : "Escolher Plano VPS"}
                    </Button>
                  </Form>

                  {/* Renderizar o botão do Mercado Pago */}
                  {preferenceId && <div id="wallet_container"></div>}

                  {preferenceId && typeof window !== "undefined" && window.MercadoPago && (
                    <Script
                      id="mercadopago-checkout"
                      dangerouslySetInnerHTML={{
                        __html: `
                          const mp = new window.MercadoPago('${process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY}', {
                            locale: 'pt-BR'
                          });
                          mp.checkout({
                            preference: {
                              id: '${preferenceId}'
                            },
                            render: {
                              container: '#wallet_container',
                              label: 'Pagar'
                            }
                          });
                        `,
                      }}
                    />
                  )}

                  {/* Mostrar o QR Code usando o init_point */}
                  {initPoint && (
                    <div className="text-center mt-4">
                      <h5>Escaneie o código QR para realizar o pagamento:</h5>
                      <QRCode value={initPoint} size={200} />
                      <p className="mt-2">
                        Ou <a href={initPoint} target="_blank" rel="noopener noreferrer">clique aqui</a> para realizar o pagamento com outros métodos.
                      </p>
                    </div>
                  )}
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

      <Script src="https://sdk.mercadopago.com/js/v2" strategy="afterInteractive" />

      <style jsx>{`
        .plan-card {
          border-radius: 15px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .plan-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
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

        .text-success {
          color: #28a745;
          font-weight: bold;
        }
      `}</style>
    </>
  );
};

export default HostingPlans;
