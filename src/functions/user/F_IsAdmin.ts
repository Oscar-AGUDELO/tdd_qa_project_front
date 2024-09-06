"use client";
import { jwtDecode } from "jwt-decode";

export const F_IsAdmin = async (): Promise<string | null> => {
  const token = sessionStorage.getItem("token");
  if (token) {
    const tokenDecoded: any = jwtDecode(token);

    if (
      tokenDecoded[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ] === "admin"
    ) {
      return "admin";
    } else {
      return null;
    }
  } else {
    return null;
  }
};
