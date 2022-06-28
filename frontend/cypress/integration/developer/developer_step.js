import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

Given(/^I am on the home page$/, () => {
    cy.visit("http://localhost:4200/home")
});

Given(/^I am on the "(.*)" tab$/, (tabSelector) => {
    cy.title().should('eq', tabSelector)
})

Given(/^I am on the "(.*)" sub-tab$/, (tabSelector) => {
    cy.get("#" + tabSelector + "-container").should('exist')
})

Given(/^I am on the "(.*)" nav-tab$/, (tabSelector) => {
    cy.get("#" + tabSelector + "-nav-container").should('exist')
})

When(/^I click on the "(.*)" tab$/, (tabSelector) => {
    cy.get("#" + tabSelector + "-tab").click()
})

When(/^I click on the "(.*)" button$/, (buttonSelector) => {
    cy.get("#" + buttonSelector + "-btn").click()
})

When(/^I click on the "(.*)" nav-tab$/, (tabSelector) => {
    cy.get("#" + tabSelector + "-nav-btn").click()
})


Then(/^I should be on the "(.*)" tab$/, (tabSelector) => {
    cy.title().should('eq', tabSelector)
})

Then(/^I should be on the "(.*)" sub-tab$/, (tabSelector) => {
    cy.get("#" + tabSelector + "-container").should('exist')
})

Then(/^I should be able to see "(.*)" buttons$/, (selectors) => {
    let selectorList = selectors.split(", ")
    for (let selector of selectorList) {
        cy.get(".selecting-container").find("#" + selector + "-btn").should('exist')
    }
})

Then(/^I should see a list of "(.*)" posts which I can select from$/, (tabSelector) => {
    cy.get("#choose-" + tabSelector + "-container").find(".post-container").its('length').should('be.gt', 0)
})


Then(/^I should be on the "(.*)" nav-tab$/, (tabSelector) => {
    cy.get("#" + tabSelector + "-nav-container").should('exist')
})