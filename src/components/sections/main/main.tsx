"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Footer from "../footer/footer";
import Header from "../header/header";
import Nav from "../nav/nav";
import { F_IsAdmin } from "@/functions/user/F_IsAdmin";

const adminPages = ["Dashboard Admin", "Create Event"];

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#f3f4f6",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {children}
    </div>
  );
};

export const Page = ({
  children,
  pageTitle,
}: {
  children: React.ReactNode;
  pageTitle: string;
}) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const result = await F_IsAdmin();
        setIsAdmin(result ? true : false);

        if (!result && adminPages.includes(pageTitle)) {
          router.replace("/unauthorized");
        }
      } catch (error) {
        console.error("Error verifying admin status", error);
        router.replace("/error");
      } finally {
        setIsLoading(false);
      }
    };

    checkAdmin();
  }, [pageTitle, router]);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          fontSize: "2rem",
          color: "#1e3a8a",
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        backgroundColor: "#ffffff",
      }}
    >
      <Header pageTitle={pageTitle} />
      <div
        style={{
          display: "flex",
          flex: 1,
          padding: "20px",
          backgroundColor: "#f9fafb",
        }}
      >
        <Nav isAdmin={isAdmin} />
        <main
          style={{
            flex: 1,
            backgroundColor: "#ffffff",
            padding: "30px",
            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
            borderRadius: "10px",
          }}
        >
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};
