import login from "./login.js";
describe("Singout user", () => {
  beforeEach(() => {
    login();
    cy.wait(4000);
  });
  it("Should visit and fill out the login form", () => {
    cy.visit("/");
    cy.get("nav li button").contains("Sign out").click();
    cy.get("nav li button").contains("Sign up").should("exist");
    cy.get("nav li button").contains("Login").should("exist");
    cy.get("#timeline h3").contains("Log in to see posts.").should("exist");
  });
});
