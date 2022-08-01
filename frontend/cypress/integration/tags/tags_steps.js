import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

// Scenario: Generating tags when post has an attached image

Given('I am on "Edit Item Page" for a particular pending post', () => {
  cy.visit("http://localhost:4200/home/pending");
  cy.get(".pending-posts-item").eq(5).click();
});

And("the pending post has an attached image", () => {
  cy.get("img").should("exist");
});

When('I click on the "generate tags" button', () => {
  cy.get("#generate-tags-btn").click({ force: true });
});
And('I click on the "enter tags" text area', () => {
  cy.get(".tagInput").click({ force: true });
});

Then("I should see a dropdown list of tags", (optionSelector) => {
  cy.get(".tags-options").should("exist");
});

// Scenario: Accept tag

Given("I see a dropdown list of tags", (optionSelector) => {
  cy.get(".tags-options").should("exist");
});

When("I click on a suitable tag related to the post", () => {
  cy.get(".tags-options").first().click({ force: true });
});

When('I type a new tag and press the "enter" key', () => {
  cy.get(".tagInput").type("new tag").type("{enter}");
});

Then('the tag should be inserted into the "enter tags" text area', () => {
  cy.get(".tags-options").first().should("exist");
});

//Scenario: Creating a tag not present in generated suggestions

And('I click on the "enter tags" text area', () => {
  cy.get(".tagInput").click({ force: true });
});

When('I type a new tag and press the "enter" key', () => {
  cy.get(".tagInput").type("Cypress.io{enter}");
});

Then('the new tag should be inserted into the "enter tags" text area', () => {
  cy.get(".tags-options").should("exist");
});

//Scenario: Saving tags to post

Given('I am on "Edit Item Page" for a particular pending post', () => {
  // cy.visit("http://localhost:4200/home/pending");
  // cy.get(".pending-posts-item").first().click();
  cy.visit("http://localhost:4200/home/pending");
  cy.get(".pending-posts-item").eq(5).click();
});

When('I click the "submit" button', () => {
  cy.get("#go-to-live").click({ force: true });
});

Then("the accepted tags should be added to the post", () => {
  cy.visit("http://localhost:4200/home/live");
});

// Scenario: Attempting to generate tags when post has no attached image

Given('I am on "Edit Item Page" for a particular pending post with no attached image', () => {
  // cy.visit("http://localhost:4200/edit/25");
  cy.visit("http://localhost:4200/home/pending");
  cy.get(".pending-posts-item").eq(0).click();
});

Then ("I should see no tags in the dropdown list", () => {
    cy.get(".tags-options").should("not.exist");
  });