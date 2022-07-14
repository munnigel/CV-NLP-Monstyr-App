
import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

Given(/^I am on the "(.*)" page as a developer$/, (tabSelector) => {
    cy.visit("http://localhost:4200/home")
    cy.title().should('eq', tabSelector)
});
When(/^I click on the "(.*)" tab$/, (tabSelector) => {
    let tabSel= tabSelector.toLowerCase().replace(" ", "-")
    cy.get("#" + tabSel + "-tab").click()
})

Then(/^I should be on the "(.*)" page$/, (tabSelector) => {
    let tabSel= tabSelector.toLowerCase().replace(" ", "-")
    cy.title().should('eq', tabSel)
})

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
    cy.url().should('eq', 'http://localhost:4200/editLive/100')
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


