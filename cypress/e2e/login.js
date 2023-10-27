export default function login() {
  cy.visit("/");
  cy.get("#modal button").contains("Login").click();
  cy.get("input#userEmail").last().click().type("yavor@test.com");
  cy.get("input#password").last().type("123456");
  cy.get("button[type='submit']").contains("Login").click();
  cy.get("nav li button").contains("Sign out").should("exist");
  cy.get("nav li").contains("Yavor").should("exist");
}
