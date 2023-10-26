import login from "./login.js";
describe("Homepage", () => {
  beforeEach(() => {
    login();
  });
  it("Check cards after login", () => {
    cy.get("#cards").should("exist");
    cy.wait(4000);
    cy.get("#cards>div").its("length").should("be.gt", 0);
    cy.get("#cards").scrollIntoView();
  });
});
