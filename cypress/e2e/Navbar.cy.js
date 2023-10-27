import login from "./login.js";
describe("Main menu test", () => {
  beforeEach(() => {
    login();
    cy.wait(4000);
  });
  it("Check logo and app name", () => {
    cy.visit("/");
    cy.get("nav a img[alt = 'Flowgram Logo']").should("exist");
    cy.get("nav a span").contains("Flowgram").should("exist");
  });
  it("Check search bar and whether it fetches the users", () => {
    cy.get('form input[type="search"]').should("exist");
    cy.get('form input[type="search"]').type("Y");
    cy.get("ul li button").contains("Yavor").should("exist");
  });
  it("Check the profile and sign out buttons", () => {
    cy.get("nav li button").contains("Profile").should("exist");
    cy.get("nav li button").contains("Sign out").should("exist");
  });
  it("Check that the username is displayed after login", () => {
    cy.get("nav li").contains("Yavor").should("exist");
  });
});
