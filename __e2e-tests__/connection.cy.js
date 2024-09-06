describe("Admin login and redirection", () => {
  it("should allow the user to log in and be redirected to /admin/dashboard", () => {
    cy.visit("/");
    cy.contains("Je suis le admin").click();
    cy.url().should("include", "/admin");
    cy.get('input[id="userName"]').clear().type("admin");
    cy.get('input[id="password"]').clear().type("root123123");
    cy.get('button[type="submit"]').click();
    cy.wait(5000);
    cy.url().should("include", "/admin/dashboard");
    cy.contains("Dashboard Admin").should("be.visible");
  });
});
