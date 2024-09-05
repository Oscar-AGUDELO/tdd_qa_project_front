import { jwtDecode } from "jwt-decode";

export const F_GetUserRole = (token: string): "admin" | "user" => {
  const role: "admin" | "user" = jwtDecode(token);
  return "admin";
};
