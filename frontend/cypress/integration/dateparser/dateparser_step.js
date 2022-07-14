import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

// Automatically generate start and end promotion dates

Given("I am on \"Edit Item Page\" for a particular pending post", () => {
    cy.visit("http://localhost:4200/edit/2")
});

When("I click on the Start Date Generate", () => {
    cy.get("#startGen").click({ force: true })
});

Then("the start date of the promotion should appear in the \"Start Date\" text box", () => {
    cy.get("#startText").contains(/[a-zA-Z0-0]/)
});



Given("I am on \"Edit Item Page\" for a particular pending post", () => {
    cy.visit("http://localhost:4200/edit/2")
});

When("I click on the \"End Date\"'s \"Generate\"", () => {
    cy.get("#endGen").click({ force: true })
});

Then("the start date of the promotion should appear in the \"Start Date\" text box", () => {
    cy.get("#endText").contains(/[a-zA-Z0-0]/)
});


Given("I am on \"Edit Item Page\" for a particular pending post", () => {
    cy.visit("http://localhost:4200/edit/12")
});

When("I click on the \"Start Date\"'s \"Generate\"", () => {
    cy.get("#startGen").click({ force: true })
});

Then("the the \"Start Date\" text box should remain empty", () => {
    cy.get("#startText").should('have.value', 'Invalid Date')
});



Given("I am on \"Edit Item Page\" for a particular pending post", () => {
    cy.visit("http://localhost:4200/edit/12")
});

When("I click on the \"End Date\"'s \"Generate\"", () => {
    cy.get("#endGen").click({ force: true })
});

Then("the \"End Date\" text box should remain empty", () => {
    cy.get("#endText").should('have.value', 'Invalid Date')
});