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
        title="Become a PVP Master - Altern Online"
        description="Join Altern Online and become a PVP master. Compete in competitive arenas and win real prizes."
        canonical="https://www.altern-online.com/"
        openGraph={{
          url: 'https://www.altern-online.com/',
          title: 'Become a PVP Master - Altern Online',
          description: 'Join Altern Online and become a PVP master. Compete in competitive arenas and win real prizes.',
          images: [
            {
              url: 'https://www.altern-online.com/images/banner.png',
              width: 800,
              height: 600,
              alt: 'Altern Online Banner',
              type: 'image/png',
            },
          ],
          site_name: 'Altern Online',
        }}
        twitter={{
          handle: '@altern_online',
          site: '@altern_online',
          cardType: 'summary_large_image',
        }}
      />
      <Navigation />
      <div style={{ backgroundColor: "#0E0E2F", minHeight: "100vh", color: "#fff", paddingTop: "70px" }}>
        <Container fluid>
          <Row className="align-items-center" style={{ minHeight: "80vh" }}>
            <Col md={6} className="text-center">
              <div className="px-4 px-md-0">
                <h1 style={{ fontSize: "9rem" }}>Become a PVP master</h1>
                <p style={{ fontSize: "1.5rem" }}>Altern Online is a competitive arena that rewards the best players with real prizes.</p>
                <Button variant="warning" href="/user/register">Sign-Up</Button>
              </div>
            </Col>
            <Col md={6} className="d-flex justify-content-end pe-0">
              <div style={{ maxWidth: "100%", height: "auto", width: "100%", paddingRight: "0" }}>
                <Image 
                  src={largeImage} 
                  alt="Large Image" 
                  layout="responsive" 
                  width={700} 
                  height={475} 
                />
              </div>
            </Col>
          </Row>
        </Container>
        <footer className="register-footer">
          <p className="footer-text">© Close Beta Soon</p>
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
