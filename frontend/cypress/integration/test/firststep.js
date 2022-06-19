import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

When("I open the to-do page", () => {
  cy.visit("http://localhost:4200");
});

Then("I sign in", () => {
  cy.get("#login-button").click();
});
