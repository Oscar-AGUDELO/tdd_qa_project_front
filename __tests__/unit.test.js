import { F_IsAdmin } from "@/functions/F_IsAdmin";
import jwtDecode from "jwt-decode";

jest.mock("jwt-decode");

describe("F_IsAdmin", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it('should return "admin" when token has admin role', async () => {
    const token = "valid-token";
    const decodedToken = {
      "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": "admin",
    };

    jwtDecode.mockReturnValue(decodedToken);
    sessionStorage.setItem("token", token);

    const result = await F_IsAdmin();
    expect(result).toBe("admin");
  });

  it("should return null when token does not have admin role", async () => {
    const token = "valid-token";
    const decodedToken = {
      "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": "user",
    };

    jwtDecode.mockReturnValue(decodedToken);
    sessionStorage.setItem("token", token);

    const result = await F_IsAdmin();
    expect(result).toBeNull();
  });

  it("should return null when there is no token", async () => {
    sessionStorage.removeItem("token");

    const result = await F_IsAdmin();
    expect(result).toBeNull();
  });
});
