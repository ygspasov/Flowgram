import login from "./login.js";
describe("Test a single card", () => {
  beforeEach(() => {
    login();
    cy.wait(4000);
  });
  it("Go to profile and get the first card", () => {
    cy.visit("/profile/yavor");
    cy.get("#profileCards>div").eq(0).should("exist");
  });
  it("Start testing the first card", () => {
    cy.visit("/profile/yavor");
    cy.get("#profileCards>div").eq(0).find("a>img.rounded-t-lg").should("exist");
    cy.get("#profileCards>div").eq(0).find("h5.text-gray-900").should("exist");
    cy.get("#profileCards>div").eq(0).find("p").contains("Posted by").should("exist");
    cy.get("#profileCards>div").eq(0).find("p").contains("On").should("exist");
    cy.get("#profileCards").eq(0).find(".likes").should("exist");
    cy.get("#profileCards").eq(0).find(".icons").should("exist");
  });
});
