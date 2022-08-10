import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";

// Scenario: Generating title when text is present in product description
Given(/^I am on "Edit Item Page" for a particular pending post$/, () => {
  cy.visit("http://localhost:4200");
  cy.get("#loginEmail").type("nigel_mun@mymail.sutd.edu.sg");
  cy.get("#loginPassword").type("123123");
  cy.get("#login-button").click();
  cy.get("#pending-posts-tab").click();
  cy.get(".pending-posts-item").eq(5).click();
});

And("the pending post has a text description", () => {
  cy.get(".page-item-description").should("not.be.empty");
});

When('I click on the "generate title" button', () => {
  cy.get("#generate-titles-btn").click({ force: true });
});

Then("I should see a dropdown list of title suggestions", (optionSelector) => {
  cy.get("#title-format-options").should("exist");
});

// Scenario: Accepting suggested title
Given("I see a dropdown list of titles", (optionSelector) => {
  cy.get("#title-format-options").should("exist");
});

When("I click on a suitable title related to the post", () => {
  cy.get("#title-format-options").first().click({ force: true });
});

Then(
  /^the title should be inserted into the "enter title" text area$/,
  (optionSelector) => {
    cy.get("#final-string").should("exist");
  }
);

// Scenario: Attempting to generate title when text is not present in product description
Given('I am on "Edit Item Page" for an empty pending post', () => {
  cy.visit("http://localhost:4200");
  cy.get("#loginEmail").type("nigel_mun@mymail.sutd.edu.sg");
  cy.get("#loginPassword").type("123123");
  cy.get("#login-button").click();
  cy.get("#pending-posts-tab").click();
  cy.get(".pending-posts-item").eq(1).click();
});

Then("I should not see any dropdown list of suggestions", (optionSelector) => {
  cy.get("#title-options").should("not.exist");
});

// Scenario: Manually input title when generated title is wrong or is unable to be generated
Given('I am on "Edit Item Page" for a particular pending post', () => {
  cy.visit("http://localhost:4200");
  cy.get("#loginEmail").type("nigel_mun@mymail.sutd.edu.sg");
  cy.get("#loginPassword").type("123123");
  cy.get("#login-button").click();
  cy.get("#pending-posts-tab").click();
  cy.get(".pending-posts-item").eq(6).click();
});

When('I click on the "format" button', () => {
  cy.get("#formatDropDown").click({ force: true });
});

Then("I should see a dropdown list of standardized title formats", () => {
  cy.get("#title-format-options").should("exist");
});

When("I click on a title format", () => {
  cy.get("#title-format-options").click();
});

Then("I should be able to manually fill in the relevant text fields", () => {
  cy.get("#title-box").type("entered some text");
});

And("a final string of the title should be shown", () => {
  cy.get("#final-string").should("exist");
});
