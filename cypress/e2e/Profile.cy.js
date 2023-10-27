import login from "./login.js";
describe("Homepage", () => {
  beforeEach(() => {
    login();
    cy.wait(2000);
  });
  it("Check profile cards after login", () => {
    cy.visit("/profile/yavor");
    cy.wait(3000);
    cy.get("#profileCards").should("exist");
    cy.get("#profileCards>div").its("length").should("be.gt", 3);
  });
  it("Check userbar", () => {
    cy.visit("/profile/yavor");
    cy.wait(3000);
    cy.get("h2").contains("Yavor").should("exist");
    cy.get("button").contains("Upload photo").should("exist");
    cy.get("#buttonGroup").should("exist");
    cy.get("#buttonGroup>span").its("length").should("be.eq", 3);
    cy.get("#buttonGroup>span").eq(0).contains("posts").should("exist");
    cy.get("#buttonGroup>span").eq(1).contains("followers").should("exist");
    cy.get("#buttonGroup>span").eq(2).contains("following").should("exist");
  });
});
