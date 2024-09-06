"use client";

import { useEffect, useState } from "react";
import { Page } from "@/components/main/main";

export default function Events() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const token = sessionStorage.getItem("token"); // Recupera el token desde sessionStorage

      try {
        const response = await fetch(
          "https://localhost:7192/api/BilletAdmin/eventDetailList",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // Adjunta el token en el header
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        const data = await response.json();
        setEvents(data); // Guarda los eventos en el estado
      } catch (error) {
        setError("Failed to load events.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <div>Loading events...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Page pageTitle="Events">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          padding: "20px",
        }}
      >
        {events.map((event: any, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "#ffffff",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h2
              style={{
                fontSize: "1.5rem",
                color: "#1e3a8a",
                marginBottom: "10px",
              }}
            >
              {event.name}
            </h2>
            <p style={{ margin: "5px 0", fontSize: "1rem", color: "#111827" }}>
              Location: {event.location}
            </p>
            <div>
              <strong>Event Dates:</strong>
              <ul style={{ paddingLeft: "20px", margin: "10px 0" }}>
                {event.event_Leage_Details_Jours.map((day: any, idx: any) => (
                  <li key={idx} style={{ fontSize: "1rem", color: "#111827" }}>
                    {new Date(day.date_event).toLocaleDateString()} - Tickets
                    Available: {day.ticket_disponible}, Sold: {day.ticket_vendu}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </Page>
  );
}
