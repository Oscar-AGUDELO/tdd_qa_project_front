"use client";
import { useEffect, useState } from "react";
import { F_IsAdmin } from "@/functions/F_IsAdmin";
import Link from "next/link";

export default function Nav({ isAdmin }: { isAdmin: boolean }) {
  return (
    <nav
      style={{
        backgroundColor: "#ddd",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {isAdmin ? (
        <>
          <div
            style={{
              backgroundColor: "#ddd",
              padding: "10px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Link href="/admin/dashboard">Dashboard</Link>
            <Link href="/admin/create/event">Create event</Link>
            <Link href="/admin/events">Events</Link>
          </div>
          <div
            style={{
              backgroundColor: "#ddd",
              padding: "10px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Link
              href="/"
              onClick={() => {
                sessionStorage.removeItem("token");
              }}
            >
              Logout
            </Link>
          </div>
        </>
      ) : (
        <>
          <Link href="/events">Events</Link>
          <Link href="/admin">Je suis le admin</Link>
        </>
      )}
    </nav>
  );
}
