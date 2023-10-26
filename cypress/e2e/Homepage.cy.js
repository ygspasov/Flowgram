import login from "./login.js";
describe("Homepage", () => {
  beforeEach(() => {
    login();
    cy.wait(4000);
  });
  it("Check cards after login", () => {
    cy.visit("/");
    cy.get("#cards").should("exist");
    cy.get("#cards>div").its("length").should("be.eq", 6);
  });
});
