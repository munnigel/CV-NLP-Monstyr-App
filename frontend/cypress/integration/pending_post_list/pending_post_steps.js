import { assert } from "console";
import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

// Scenario: Navigating to pending post tab
Given("that I am logged in and on the overview page as a developer", () => {
    cy.visit("http://localhost:4200/home/overview")
});

When("I click on 'Pending Posts' tab", () => {
    cy.get("#pending-posts-tab").click()
});

Then("I should be redirected to the correct Pending Posts url", () => {
    cy.url().should('eq', 'http://localhost:4200/home/pending')
});

//Scenario: Edit post x details in pending post tab

Given("that I click on the 'Pending Post' tab", () => {
    cy.visit("http://localhost:4200/home/pending")
})

When("I click on the number {string} entry in the Pending Post page", (entry: string) => {
    cy.get(".pending-posts-item:first").click()
})

Then("I should be redirected to edit url of the number {string} entry in the Pending Post page", (entry: string) => {
    cy.url().should('eq', 'http://localhost:4200/edit/' + entry)
})

//Scenario: Going back to pending page from edit page


Given("that I am in the edit post tab", () => {
    cy.visit("http://localhost:4200/edit/0")
})

When("I click on the 'Back to Pending Page' button", () => {
    cy.get('#back-to-pending').click()
})

Then("I should be redirected to the correct url", () => {
    cy.url().should('eq', 'http://localhost:4200/home/pending')
})


//Scenario: Going to live page after submitting on edit page


Given("that I am on the edit url of the number {string} entry in the Pending Post page", (entry:string) => {
    cy.visit("http://localhost:4200/edit/" + entry)
})

When("I click on the 'Submit' button", () => {
    cy.get('#go-to-live').click()
})

Then("I should be redirected to the Live Posts url", () => {
    cy.url().should('eq', 'http://localhost:4200/home/processed')
})


