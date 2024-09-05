"use client";
import { redirect } from "next/navigation";
import { styles } from "./page.style";
import { useEffect } from "react";
import { F_Sleep } from "../../functions/utils/F_Sleep";
import { F_GetUserRole } from "../../functions/user/F_GetUserRole";

export default function Home() {
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const role = F_GetUserRole(token);
      console.log(role);
      if (role === "admin") {
        return F_Sleep(redirect("/admin"), 1000);
      } else if (role === "user") {
        return F_Sleep(redirect("/admin"), 1000);
      }
    } else {
      return F_Sleep(console.log("/conection"), 1000);
    }
  }, []);

  return <div style={styles.main}>Home</div>;
}
