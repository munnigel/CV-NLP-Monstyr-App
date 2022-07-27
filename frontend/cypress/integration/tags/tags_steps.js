import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

// Scenario: Generating tags when post has an attached image

Given("I am on \"Edit Item Page\" for a particular pending post", () => {
  cy.visit("http://localhost:4200/home/pending");
  cy.get(".pending-posts-item").first().click();
});

And("the pending post has an attached image", () => {
  cy.get("img").should("exist");
});

When('I click on the "generate tags" button', () => {
  cy.get("#generate-tags-btn").click({ force: true });
});
And("I click on the \"enter tags\" text area", () => {
    cy.get("#tagInput").click({ force: true })
});

Then("I should see a dropdown list of tags", (optionSelector) => {
      cy.get("#tags-options").should("exist")
});



    // Scenario: Generating tags when post has no attached image

Given("I see a dropdown list of tags", (optionSelector) => {
    cy.get("#tags-options").should("exist")
});

When ("I click on a suitable tag related to the post", () => {
    cy.get("#tags-options").first().click({ force: true })
});

Then("the tag should be inserted into the \"enter tags\" text area", () => {
    cy.get("#tags-options").should("not.exist")
});


// Creating a tag not present in generated suggestions
Given("I am on \"Edit Item Page\" for a particular pending post", () => {
    cy.visit("http://localhost:4200/home/pending");
  cy.get(".pending-posts-item").first().click();
});

When ("I click on the \"enter tags\" text area", () => {
    cy.get("#tagInput").click({ force: true })
});

When ("I type a new tag and press the \"enter\" key", () => {
    cy.get("#tagInput").type("new tag").type("{enter}")
});

Then ("the new tag should be inserted into the \"enter tags\" text area", (optionSelector) => {
    cy.get("#tags-options").should("exist")
});

//Saving tags to post
Given("I am on \"Edit Item Page\" for a particular pending post", () => {
    cy.visit("http://localhost:4200/home/pending");
    cy.get(".pending-posts-item").first().click();
});

And ("I click on the \"submit\" button", () => {
    cy.get("#submit-btn").click({ force: true })
});

Then ("the accepted tags should be added to the post", () => {
    cy.get(".accepted-tags").should("exist")
});






//Attempting to generate tags when post has no attached image

Given("I am on \"Edit Item Page\" for a particular pending post", () => {
    cy.visit("http://localhost:4200/home/pending");
  cy.get(".pending-posts-item").first().click();
});

And("the pending post has no attached image", () => {
    cy.get("img").should("not.exist");
    });

When('I click on the "generate tags" button', () => {
    cy.get("#generate-tags-btn").click({ force: true });
    });


