import { assert } from "console";
import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

Given("that I am logged in and on the overview page", () => {
    cy.visit("http://localhost:4200/home/overview")
})

When("I click on 'Live Posts' tab", () => {
    cy.get("#live_post_tab_btn").click()
});

Then("I should be redirected to the correct url", () => {
    cy.url().should('eq', 'http://localhost:4200/home/processed')
});

Given("that I am in the Live Post tab", () => {
    cy.visit("http://localhost:4200/home/processed")
})

When("I click on the first Live Post entry", () => {
    cy.get(".col:first").click()
});

Then("I should be redirected to the first live edit url", () => {
    cy.url().should('eq', 'http://localhost:4200/editLive/1')
});

Given("that I am in the Live Post tab", () => {
    cy.visit("http://localhost:4200/home/processed")
})

When("I click on the last Live Post entry", () => {
    cy.get(".col:last").click()
});

Then("I should be redirected to the last live edit url", () => {
    cy.url().should('eq', 'http://localhost:4200/editLive/90')
});





Given("that I am in the edit post tab", () => {
    cy.visit("http://localhost:4200/home/processed").get(".col:first").click()

})

When("I click on the 'Back to Live Page' button", () => {
    cy.get("#back-to-live1").click()
})

Then("I should be redirected to the live url", () => {
    cy.url().should('eq', 'http://localhost:4200/home/processed')
})


