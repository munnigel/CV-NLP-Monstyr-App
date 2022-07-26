import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

// Scenario: Navigating to pending post tab
Given(/^I am on the "(.*)" page as a developer$/, (tabSelector) => {
  cy.visit("http://localhost:4200/home");
  cy.title().should("eq", tabSelector);
});
When(/^I click on the "(.*)" tab$/, (tabSelector) => {
  let tabSel = tabSelector.toLowerCase().replace(" ", "-");
  cy.get("#" + tabSel + "-tab").click();
});

Then(/^I should be on the "(.*)" page$/, (tabSelector) => {
  let tabSel = tabSelector.toLowerCase().replace(" ", "-");
  cy.title().should("eq", tabSel);
});

//Scenario: Edit post x details in pending post tab

Given("that I click on the 'Pending Post' tab", () => {
  cy.visit("http://localhost:4200/home/pending");
});

When(
  /^I click on the number "(.*)" entry in the Pending Post page$/,
  (number) => {
    cy.get(".pending-posts-item:nth-child(" + number + ")").click();
  }
);

Then(
  /^I should be redirected to edit url of the number "(.*)" entry in the Pending Post page$/,
  (entry) => {
    cy.url().should("eq", "http://localhost:4200/edit/" + entry);
  }
);

//Scenario: Going back to pending page from edit page

Given("that I am in the edit post tab", () => {
  cy.visit("http://localhost:4200/edit/0");
});

When("I click on the 'Back to Pending Page' button", () => {
  cy.get("#back-to-pending").click();
});

Then("I should be redirected to the correct url", () => {
  cy.url().should("eq", "http://localhost:4200/home/pending");
});

//Scenario: Going to live page after submitting on edit page

Given(
  /^that I am on the edit url of the number "(.*)" entry in the Pending Post page$/,
  (entry) => {
    cy.visit("http://localhost:4200/edit/" + entry);
  }
);

When("I click on the 'Submit' button", () => {
  cy.get("#go-to-live").click();
});

Then("I should be redirected to the Live Posts url", () => {
  cy.url().should("eq", "http://localhost:4200/home/processed");
});
