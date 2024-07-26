import { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Image from "next/image";
import { NextSeo } from 'next-seo';
import Navigation from "../components/Navbar";
import largeImage from "../imgs/banner.png"; // Ensure this path is correct based on your project structure
import footerImg from "../imgs/altern-51.png"; // Ensure this path is correct based on your project structure

const Index = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Karla:wght@400;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    const style = document.createElement("style");
    style.innerHTML = `
      body, .register-footer, h1, p, button {
        font-family: "Karla"; font-weight: bold;
      }
      .register-footer {
        font-size: 0.8em;
        color: white;
        padding: 10px;
        position: absolute;
        right: 10px;
        bottom: 10px;
        left: auto; /* Ensure left is auto to avoid conflicts */
        display: flex;
        align-items: center; /* Align items vertically */
      }
      .footer-img {
        width: 40px;
        height: 40px;
        margin-left: 10px;
        margin-right: 5px;
      }
      .footer-text {
        margin-right: 25px;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
      document.head.removeChild(link);
    };
  }, []);

  return (
    <>
      <NextSeo
        title="Hospedagem e VPS com Confiabilidade e Performance!"
        description="Hospedagem de websites e VPS com preços imbatíveis! Escolha a Underhost."
        canonical="https://www.underhost.cloud/"
        openGraph={{
          url: 'https://www.underhost.cloud/',
          title: 'Hospedagem e VPS com Confiabilidade e Performance!',
          description: 'Hospedagem de websites e VPS com preços imbatíveis! Escolha a Underhost.',
          images: [
            {
              url: 'https://i.imgur.com/1FIUZZx.png',
              width: 179,
              height: 177,
              alt: 'Underhost Banner',
              type: 'image/png',
            },
          ],
          site_name: 'Underhost',
        }}
        
      />
      <Navigation />
      <div style={{ backgroundColor: "#0E0E2F", minHeight: "100vh", color: "#fff", paddingTop: "70px" }}>
        <Container fluid>
          <Row className="align-items-center" style={{ minHeight: "80vh" }}>
            <Col md={6} className="text-center">
              <div className="px-4 px-md-0">
                <h1 style={{ fontSize: "9rem" }}>Hospedagem e VPS</h1>
                <p style={{ fontSize: "1.5rem" }}>Na Underhost, oferecemos servidores de alto desempenho para garantir que seu site ou VPS esteja sempre disponível e funcionando perfeitamente. Conheça nossos planos acessíveis e de alta qualidade!.</p>
                <Button variant="warning" href="/user/plans">Confira</Button>
              </div>
            </Col>
            <Col md={6} className="d-flex justify-content-end pe-0">
              <div style={{ maxWidth: "100%", height: "auto", width: "auto", paddingRight: "0" }}>
                <Image 
                  src={largeImage} 
                  alt="Large Image" 
                  layout="responsive" 
                  width={550} 
                  height={605} 
                  quality={67}
                  style={{ paddingRight: "4rem"}}
                />
              </div>
            </Col>
          </Row>
        </Container>
        <footer className="register-footer">
          <p className="footer-text">© Underhost. Todos os direitos reservados.</p>
          <Image
            className="footer-img"
            src={footerImg} 
            alt="Footer Image" 
            width={40} 
            height={40} 
          />
        </footer>
      </div>
    </>
  );
};

export default Index;
