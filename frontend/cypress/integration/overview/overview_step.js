import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

Given("I am on login page", () => {
    cy.visit("http://localhost:4200")
});

When("I click on the login button", () => {
    cy.get("#login-button").click()
});

Then("I should be on the overview page", () => {
    assert(cy.url(), "http://localhost:4200/home/overview")
});