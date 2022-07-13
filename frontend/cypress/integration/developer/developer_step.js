import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

// SELECT POST
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

And(/^I should be able to see "(.*)" button$/, (selectors) => {
    let selectorList = selectors.split(", ")
    for (let selector of selectorList) {
        let sel= selector.toLowerCase().replace(" ", "-")
        cy.get(".selecting-container").find("#" + sel + "-btn").should('exist')
    }
})

 
Given(/^the "(.*)" button is selected$/, (tabSelector) => {
    let sel= tabSelector.toLowerCase().replace(" ", "-")
    cy.get("#" + sel + "-btn").click()
})

// Upload manually
When(/^I click on the "(.*)" button$/, (selector) => {
    let sel= selector.toLowerCase().replace(" ", "-")
        cy.get(".selecting-container").find("#choose-file-btn").click()
    })
Then (/^I should be able to see a "(.*)" dialog$/, (selector) => {
    let sel= selector.toLowerCase().replace(" ", "-")
    cy.get(".selecting-container").find("#" + sel + "-dialog").should('exist')
})

Then(/^ I should be able to upload a file from my computer$/, () => {
    const p = 'Picture.png'
      //upload file with attachFile
    cy.get('#file-upload').attachFile(p)
})



// # to find id and . to find class

// choose live, choose pending 
When(/^I click on one of the "(.*)" post$/, (selector) => {
    let sel= selector.toLowerCase().replace(" ", "-")
    cy.get('.select-post').select(0).click()
})

Then (/^I should be able to see "(.*)" in the "(.*)" section$/, (selectors1, selectors2) => {
    
    let sel1 = selectors1.split(", ")
    let sel2 = selectors2.split(", ")
    
    for (let selector of selectorList1) {
        let sel= selector.toLowerCase().replace(" ", "-")
        cy.get("." + sel + "-container").find("#" + sel + "-btn").should('exist')
    }
    
    for (let selector of selectorList2) {
        let sel= selector.toLowerCase().replace(" ", "-")
        cy.get("." + sel + "-container").find("#" + sel + "-btn").should('exist')
    }
})