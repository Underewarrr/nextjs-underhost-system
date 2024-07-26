import { useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import Image from "next/image";
import Navigation from "../../components/Navbar";
import Link from "next/link";
import { FaFacebook, FaGoogle, FaDiscord } from "react-icons/fa";
import backGroundimg from "../../imgs/banner2.png";
import footerImg from "../../imgs/altern-51.png";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";

const Register = () => {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("BR");

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    const style = document.createElement("style");
    style.innerHTML = `
      body, .register-form-container, .register-footer, .signup-submit button, .signup-footer, .signup-tabs span, .register-icon {
        font-family: "Poppins";
      }

      .page-container {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
      }

      .content-wrap {
        flex: 1;
      }

      .register-container {
        position: relative;
        right: 150px;
        top: 5px;
      }

      .register-background-image {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        object-fit: cover;
      }

      .register-form-container {
        width: 486px;
        height: 621px;
        padding: 20px;
        background-color: #181818;
        color: white;
        position: absolute;
        top: 20%;
        left: 50%;
        transform: translateX(-50%);
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }

      .register-input-field {
        width: 100%;
        margin-bottom: 20px;
        font-size: 0.9em;
        padding: 10px;
        border: 2.5px solid #FFD723;
        background-color: #181818;
        color: #FFFFFF;
      }

      .register-input-field::placeholder {
        color: #FFFFFF;
      }

      .register-input-field:focus, .register-input-field:active {
        background-color: #181818;
        color: #FFFFFF;
        border-color: #FFD723;
        outline: none;
        box-shadow: none;
      }

      .register-input-field-label {
        color: #FFFFFF;
      }

      .register-login-icons {
        display: flex;
        justify-content: space-between;
        margin-bottom: 30px;
      }

      .register-icon {
        cursor: pointer;
        font-size: 2em;
        color: white;
      }

      .register-footer {
        font-size: 0.8em;
        color: white;
        padding: 10px;
        position: relative;
        bottom: 0;
        left: 0;
        width: 100%;
        text-align: center;
        background-color: #181818;
      }

      .signup {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .signup-tabs {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 20px;
      }

      .signup-tabs span {
        width: 10px;
        height: 10px;
        background-color: white;
        border-radius: 50%;
        margin: 0 5px;
      }

      .signup-tabs span.active {
        background-color: #FFD723;
      }

      .register-social-buttons {
        display: flex;
        justify-content: space-around;
        margin-top: 10px;
        margin-bottom: 10px;
      }

      .signup-submit {
        display: flex;
        justify-content: center;
        margin-top: 20%;
        margin-bottom: 10px;
      }

      .signup-submit button {
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

      .signup-footer {
        margin-top: 20px;
        text-align: center;
        font-size: 10px;
      }

      .signup-footer a {
        color: #FFD723;
        text-decoration: none;
      }

      .create-account {
        display: flex;
        justify-content: center;
        font-size: 6rem;
        color: white;
        width: 60%;
        font-weight: bold;
        position: absolute;
        font-family: Poppins;
        top: calc(5% + 621px + 20px);
        left: 35%;

        transform: translateX(-50%);
        text-align: center;
      }

      .phone-input-container {
        display: flex;
        align-items: center;
      }

      .flag-icon {
        margin-right: 10px;
      }

      .text-account p {
        font-size: 9px;
      }

      .login-footer {
        font-size: 0.8em;
        color: white;
        padding: 50px;
        position: absolute;
        bottom: 10px;
      }

      .login-footer a {
        color: #FFD723;
        text-decoration: none;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
      document.head.removeChild(link);
    };
  }, []);

  const handleNextStep = () => {
    if (step === 0 && email) setStep(step + 1);
    if (step === 1 && username) setStep(step + 1);
    if (step === 2 && password && confirmPassword === password) setStep(step + 1);
    if (step === 3 && phoneNumber) {
      setStep(step + 1);
      console.log(email, username, password, phoneNumber);
      handleFormSubmit(); // Request backend login at the final step
    }
  };

  const isButtonDisabled = () => {
    if (step === 0) return !email;
    if (step === 1) return !username;
    if (step === 2) return !password || !confirmPassword || password !== confirmPassword;
    if (step === 3) return !phoneNumber;
    return false;
  };

  const stepTexts = [
    "What’s your email?",
    "Choose a username",
    "Choose a password",
    "Enter your phone number",
  ];

  const handleCountryChange = (e) => {
    const selectedCountryCode = e.target.value;
    setCountryCode(selectedCountryCode);
  };

  const handleFormSubmit = async () => {
    const formData = {
      email,
      username,
      password,
      phoneNumber: `+${phoneNumber}`,
      countryCode,
    };
    try {
      const response = await fetch("/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log("Registration successful:", result);
      useRouter().push("/user/login");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <>
      <NextSeo
        title="Register - Altern Online"
        description="Altern Online and become a PVP master. Compete in competitive arenas and win real prizes."
        canonical="https://www.altern-online.com/"
        openGraph={{
          url: "https://www.altern-online.com/",
          title: "Become a PVP Master - Altern Online",
          description:
            "Join Altern Online and become a PVP master. Compete in competitive arenas and win real prizes.",
          images: [
            {
              url: "https://www.altern-online.com/images/banner.png",
              width: 800,
              height: 600,
              alt: "Altern Online Banner",
              type: "image/png",
            },
          ],
          site_name: "Altern Online",
        }}
        twitter={{
          handle: "@altern_online",
          site: "@altern_online",
          cardType: "summary_large_image",
        }}
      />
      <div className="page-container">
        <div className="content-wrap">
          <Image
            src={backGroundimg}
            alt="Background Image"
            quality="100"
            layout="fill"
            className="register-background-image"
          />
          <div className="register-container">
            <Container>
              <div className="register-form-container">
                <div className="signup" data-testid="new-signup">
                  <div className="signup-tabs">
                    <Image
                      className="footer-img"
                      src={footerImg}
                      alt="Footer Image"
                      width={40}
                      height={40}
                    />
                    <div
                      style={{ display: "flex", alignItems: "center", marginLeft: "10px" }}
                    >
                      <span className={step === 0 ? "active" : ""} role="tab"></span>
                      <span className={step === 1 ? "active" : ""} role="tab"></span>
                      <span className={step === 2 ? "active" : ""} role="tab"></span>
                      <span className={step === 3 ? "active" : ""} role="tab"></span>
                      <span className={step === 4 ? "active" : ""} role="tab"></span>
                    </div>
                  </div>
                  <h5>{stepTexts[step]}</h5>
                  <Form>
                    {step === 0 && (
                      <>
                        <Form.Group controlId="formEmail">
                          <Form.Control
                            type="email"
                            placeholder="Enter email"
                            className="register-input-field"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </Form.Group>
                        <p style={{ marginTop: "15%", fontSize: "13px" }}>
                          YOU CAN ALSO CREATE AN ACCOUNT WITH:
                        </p>
                        <div className="register-social-buttons">
                          <FaFacebook className="register-icon" />
                          <FaGoogle className="register-icon" />
                          <FaDiscord className="register-icon" />
                        </div>
                      </>
                    )}
                    {step === 1 && (
                      <Form.Group controlId="formUsername">
                        <Form.Label className="register-input-field-label">Username</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter username"
                          className="register-input-field"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </Form.Group>
                    )}
                    {step === 2 && (
                      <>
                        <Form.Group controlId="formPassword">
                          <Form.Label className="register-input-field-label">Password</Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="Enter password"
                            className="register-input-field"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </Form.Group>
                        <Form.Group controlId="formConfirmPassword">
                          <Form.Label className="register-input-field-label">Confirm Password</Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="Confirm password"
                            className="register-input-field"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                        </Form.Group>
                      </>
                    )}
                    {step === 3 && (
                      <Form.Group controlId="formPhoneNumber">
                        <Form.Label className="register-input-field-label">Phone Number</Form.Label>
                        <div className="phone-input-container">
                          <img
                            src={`https://flagsapi.com/${countryCode}/flat/24.png`}
                            alt="Country Flag"
                            className="flag-icon"
                          />
                          <Form.Control
                            type="text"
                            placeholder="Enter phone number"
                            className="register-input-field"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                          />
                        </div>
                        <Form.Control
                          as="select"
                          value={countryCode}
                          onChange={handleCountryChange}
                          className="register-input-field"
                          style={{ marginTop: "10px" }}
                        >
                          <option value="BR">Brazil</option>
                          <option value="US">United States</option>
                          <option value="CA">Canada</option>
                          <option value="GB">United Kingdom</option>
                          <option value="AU">Australia</option>
                          <option value="IN">India</option>
                          <option value="DE">Germany</option>
                          <option value="FR">France</option>
                          <option value="JP">Japan</option>
                          <option value="CN">China</option>
                        </Form.Control>
                      </Form.Group>
                    )}
                  </Form>
                  <div className="signup-submit">
                    <Button
                      type="button"
                      onClick={handleNextStep}
                      disabled={isButtonDisabled()}
                    >
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
                  <p className="login-footer">
                    ALREADY HAVE AN ACCOUNT? <Link href="/user/login">Login here</Link>
                  </p>
                </div>
              </div>
            </Container>
          </div>
          <p className="create-account">CREATE AN ACCOUNT</p>
        </div>
      </div>
      <footer className="register-footer">
        this site is protected and its privacy policy and terms of service apply. © 2024 Altern
      </footer>
    </>
  );
};

export default Register;
