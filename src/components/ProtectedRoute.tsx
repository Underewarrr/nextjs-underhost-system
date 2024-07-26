// components/ProtectedRoute.tsx
import React, { useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/router";
import { Spinner, Container } from "react-bootstrap";

// Custom JWT decoding function
export interface JwtPayload {
  exp?: number;
  iat?: number;
  [key: string]: any;
}

export function jwtDecode(token: string): JwtPayload {
  if (!token) {
    throw new Error("Token is required");
  }

  const parts = token.split('.');
  if (parts.length !== 3) {
    throw new Error("Invalid token format");
  }

  const base64Url = parts[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(char => {
        return '%' + ('00' + char.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );

  return JSON.parse(jsonPayload);
}

// ProtectedRoute component
interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("key"); // Ensure this key matches the key used in localStorage
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log("Decoded Token:", decodedToken);
        // Check if the token has an expiration time and if it has expired
        if (decodedToken.exp && decodedToken.exp * 1000 < Date.now()) {
          console.warn("Token expired");
          localStorage.removeItem("key");
          router.push("/user/login");
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Invalid token", error);
        localStorage.removeItem("key");
        router.push("/user/login");
      }
    } else {
      console.warn("No token found");
      router.push("/user/login");
    }
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" role="status">
          <span className="sr-only">Carregando...</span>
        </Spinner>
      </Container>
    );
  }

  return isAuthenticated ? <>{children}</> : null;
};

export default ProtectedRoute;
