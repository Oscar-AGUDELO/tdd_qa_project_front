"use client";

import { Page } from "@/components/sections/main/main";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ConnectionAdmin() {
  const [email, setEmail] = useState("admin");
  const [password, setPassword] = useState("root123123");
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const res = await fetch(
        "https://localhost:7192/api/authentification/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ UserName: email, Password: password }),
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      if (data.token) {
        sessionStorage.setItem("token", data.token);
        router.push("/admin/dashboard");
      } else {
        setErrorMessage("Invalid email or password.");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <Page pageTitle="Connection Admin">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#f3f4f6",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "400px",
            backgroundColor: "#ffffff",
            padding: "30px",
            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
            borderRadius: "10px",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              fontSize: "1.8rem",
              color: "#1e3a8a", // Azul profundo
              marginBottom: "20px",
              fontWeight: "700",
              textTransform: "uppercase",
            }}
          >
            Login
          </h1>
          {errorMessage && (
            <p
              style={{
                color: "red",
                fontSize: "0.9rem",
                textAlign: "center",
                marginBottom: "15px",
              }}
            >
              {errorMessage}
            </p>
          )}
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "15px" }}>
              <label
                htmlFor="email"
                style={{
                  display: "block",
                  marginBottom: "8px",
                  color: "#111827", // Negro profundo
                  fontSize: "1rem",
                }}
              >
                Email:
              </label>
              <input
                type="test"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #d1d5db",
                  fontSize: "1rem",
                }}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label
                htmlFor="password"
                style={{
                  display: "block",
                  marginBottom: "8px",
                  color: "#111827", // Negro profundo
                  fontSize: "1rem",
                }}
              >
                Password:
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #d1d5db",
                  fontSize: "1rem",
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "#1e3a8a", // Azul profundo
                color: "#ffffff",
                fontSize: "1.2rem",
                fontWeight: "600",
                textTransform: "uppercase",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
              }}
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </Page>
  );
}
