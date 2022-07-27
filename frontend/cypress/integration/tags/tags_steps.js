import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";


// Scenario: Generating tags when post has an attached image

Given("I am on \"Edit Item Page\" for a particular pending post", () => {
    cy.visit("http://localhost:4200/edit/4")
});

And("the pending post has an attached image", () => {
    cy.get("img").should("exist")
});

When("I click on the \"generate tags\" button", () => {
    cy.get("#generate-tags-btn").click({ force: true })
});
And("I click on the \"enter tags\" text area", () => {
    cy.get("#tags-box").click({ force: true })
});

Then("I should see a dropdown list of tags", (optionSelector) => {
      cy.get("#mat-option-text").click({force:true})
      });

    // Scenario: Generating tags when post has no attached image
Given("I should see a dropdown list of tags", (optionSelector) => {
    cy.get("#mat-option-text").first().click({force:true})
});

When ("I click on the suitable tags related to the post", () => {
    cy.get(".tags-options").click({ force: true })
});
