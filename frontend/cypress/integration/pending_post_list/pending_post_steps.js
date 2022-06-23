import { assert } from "console";
import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

Given("that I am logged in and on the overview page", () => {
    cy.visit("http://localhost:4200/home/overview")
});

When("I click on 'Pending Posts' tab", () => {
    cy.get("#pending_post_tab_btn").click()
});

Then("I should be redirected to the correct url", () => {
    assert(cy.url(), 'http://localhost:4200/home/pending')
});


Given("that I am in the Pending Post tab", () => {
    cy.visit("http://localhost:4200/home/pending")
})

When("I click on the first Pending Post entry", () => {
    cy.get(".pending-posts-item:first").click()
})

Then("I should be redirected to the correct url", () => {
    assert(cy.url(), "http://localhost:4200/edit/0")
})


Given("that I am in the Pending Post tab", () => {
    cy.visit("http://localhost:4200/home/pending")
})

When("I click on the last Pending Post entry", () => {
    cy.get(".pending-posts-item:last").click()
})

Then("I should be redirected to the correct url", () => {
    assert(cy.url(), "http://localhost:4200/edit/9")
})





Given("that I am in the edit post tab", () => {
    cy.visit("http://localhost:4200/edit/0")
})

When("I click on the 'Back to Pending Page' button", () => {
    cy.get('#back-to-pending').click()
})

Then("I should be redirected to the correct url", () => {
    assert(cy.url(), "http://localhost:4200/home/pending")
})





Given("that I am in the edit post tab", () => {
    cy.visit("http://localhost:4200/edit/0")
})

When("I click on the 'Submit' button", () => {
    cy.get('#go-to-live').click()
})

Then("I should be redirected to the correct url", () => {
    assert(cy.url(), "http://localhost:4200/home/processed")
})


