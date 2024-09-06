let token = "";

before(() => {
  cy.request({
    method: "POST",
    url: "https://localhost:7192/api/authentification/login",
    body: {
      UserName: "admin",
      Password: "root123123",
    },
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    token = response.body.token;
  });
});

describe("Token-based redirection and navigation", () => {
  context("When the user has a token and isAdmin", () => {
    beforeEach(() => {
      cy.visit("/");
      cy.window().then((win) => {
        win.sessionStorage.setItem("token", token);
      });
      cy.reload();
    });

    it('should redirect to /admin/dashboard and display "Dashboard Admin"', () => {
      cy.url().should("include", "/admin/dashboard");
      cy.contains("Dashboard Admin").should("be.visible");
    });
  });

  context("When the user does not have a token", () => {
    beforeEach(() => {
      cy.visit("/");
    });

    it('should not redirect and display a link to "Events"', () => {
      cy.url().should("eq", Cypress.config().baseUrl + "/");
      cy.contains("Events").should("be.visible");
    });

    it('should navigate to /events when clicking on the "Events" link and display "Bientôt!"', () => {
      cy.contains("Events").click();
      cy.url().should("include", "/events");
      cy.contains("Bientôt!").should("be.visible");
    });
  });
});

describe("Token-based access control", () => {
  context("When the user does not have a token", () => {
    beforeEach(() => {
      cy.visit("/");
    });

    it("should redirect to /error when trying to access /admin/dashboard", () => {
      cy.visit("/admin/dashboard", { failOnStatusCode: false });
      cy.url().should("include", "/unauthorized");
      cy.contains("Unauthorized").should("be.visible");
    });
  });
});
