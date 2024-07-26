import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Container, Form, Button } from "react-bootstrap";
import Image from "next/image";
import Navigation from "../../components/Navbar";
import Link from "next/link";
import { FaFacebook, FaGoogle, FaDiscord } from "react-icons/fa";
import logoImg from "../../imgs/banner.png"; // Certifique-se de que o caminho da imagem esteja correto
import { NextSeo } from "next-seo";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    const style = document.createElement("style");
    style.innerHTML = `
      body, .login-form-container, .login-footer, .login-submit button, .login-footer, .login-tabs span, .login-icon {
        font-family: 'Poppins', sans-serif;
      }

      .login-container {
        position: relative;
        width: 100%;
        min-height: 100vh;
        overflow: auto; /* Allow scrolling */
        padding-bottom: 60px; /* Space for fixed footer */
      }

      .login-background-image {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        object-fit: cover;
      }

      .login-logo {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 5%;
        margin-bottom: 20px;
      }

      .login-form-container {
        max-width: 486px;
        width: 90%; /* Make it responsive */
        padding: 20px;
        background-color: #181818;
        color: white;
        margin: 0 auto;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box; /* Include padding in width calculation */
      }

      .login-input-field {
        width: 100%;
        margin-bottom: 20px;
        font-size: 0.9em;
        padding: 10px;
        border: 2.5px solid #FFD723;
        background-color: #181818;
        color: #FFFFFF;
      }

      .login-input-field::placeholder {
        color: #FFFFFF;
      }

      .login-input-field:focus, .login-input-field:active {
        background-color: #181818;
        color: #FFFFFF;
        border-color: #FFD723;
        outline: none;
        box-shadow: none;
      }

      .login-input-field-label {
        color: #FFFFFF;
      }

      .login-login-icons {
        display: flex;
        justify-content: space-between;
        margin-bottom: 30px;
      }

      .login-icon {
        cursor: pointer;
        font-size: 2em;
        color: white;
      }

      .login-footer {
        font-size: 0.8em;
        color: white;
        position: absolute;
        bottom: 10px;
        text-align: center;
      }

      .login {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .login-tabs {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 20px;
      }

      .login-tabs span {
        width: 10px;
        height: 10px;
        background-color: white;
        border-radius: 50%;
        margin: 0 5px;
      }

      .login-tabs span.active {
        background-color: #FFD723;
      }

      .login-social-buttons {
        display: flex;
        justify-content: space-around;
        margin-top: 10px;
        margin-bottom: 10px;
      }

      .login-submit {
        display: flex;
        justify-content: center;
        margin-top: 20px;
        margin-bottom: 10px;
      }

      .login-submit button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50px;
        height: 50px;
        border: none;
        border-radius: 50%;
        background-color: #FFD723;
        color: #181818;
      }

      .login-footer {
        margin-top: 20px;
        text-align: center;
        font-size: 10px;
      }

      .login-footer a {
        color: #FFD723;
        text-decoration: none;
      }

      .error-message {
        color: red;
        text-align: center;
        margin-top: 10px;
      }

      .register-footer {
        font-size: 0.8em;
        color: white;
        padding: 10px;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        text-align: center;
        background-color: #181818;
        z-index: 1000; /* Ensures the footer stays above other elements */
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
      document.head.removeChild(link);
    };
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = { email, password };
    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) {
        console.log("Login successful:", result);
        localStorage.setItem('key', result.token);
        localStorage.setItem('email', email);

        router.push("/user/dashboard");
      } else {
        setErrorMessage(result.message);
      }
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage("Login failed. Please try again.");
    }
  };

  return (
    <>
      <Navigation />
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
      <div className="login-container" style={{ backgroundColor: "#0E0E2F" }}>
        <Container>
          <div className="login-logo">
            <Image src={logoImg} alt="UnderHost Logo" width={605} height={65} />
          </div>
          <div className="login-form-container">
            <div className="login" data-testid="login-form">
              <Form onSubmit={handleFormSubmit}>
                <Form.Group controlId="formEmail">
                  <Form.Label className="login-input-field-label">Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    className="login-input-field"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formPassword">
                  <Form.Label className="login-input-field-label">Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    className="login-input-field"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <p style={{ marginTop: "20%", fontSize: "15px" }}>YOU CAN ALSO LOGIN WITH:</p>
                <div className="login-social-buttons">
                  <FaFacebook className="login-icon" />
                  <FaGoogle className="login-icon" />
                  <FaDiscord className="login-icon" />
                </div>
                <div className="login-submit" style={{ marginTop: "25%" }}>
                  <Button type="submit">
                    <svg
                      role="img"
                      viewBox="0 0 32 32"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-label="forward"
                      className="sc-hLseeU idnFbI sc-iAEyYk hzOjdA"
                    >
                      <path d="M22.8011 14.75L14.2234 6.70971L16.0474 5L26.8695 15.1441C27.3732 15.6163 27.3732 16.3817 26.8695 16.8538L16.0474 26.998L14.2234 25.2883L22.7989 17.25H4.75V14.75H22.8011Z"></path>
                    </svg>
                  </Button>
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <p className="login-footer">DON&apos;T HAVE AN ACCOUNT? <Link href="/user/register">Register here</Link></p>
              </Form>
            </div>
          </div>
        </Container>
        <footer className="register-footer">
          this site is protected and its privacy policy and terms of service apply. © 2024 UnderHost
        </footer>
      </div>
    </>
  );
};

export default Login;
