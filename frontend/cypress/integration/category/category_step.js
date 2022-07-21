import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

Given(/^I am on "Edit Item Page" for a particular pending post$/, () => {
  cy.visit("http://localhost:4200/home/pending");
  cy.get(".pending-posts-item").first().click();
});

When(/^I click on the "(.*)" button$/, (buttonSelector) => {
  let temp = buttonSelector.replace(" ", "-");
  temp += "-btn";
  cy.get("." + temp).click();
});

Then(/^I should see the "(.*)" sign$/, (iconSelector) => {
  let temp = iconSelector.replace(" ", "-");
  cy.get("#" + temp).should("exist");
});

When(/^I click on the "(.*)" text area$/, (selector) => {
  let temp = selector.replace(" ", "-");
  cy.get("#" + temp).click();
});

Then(/^I should see "(.*)" options$/, (optionSelector) => {
  if (optionSelector.includes("no")) {
    cy.get(".categories-options").should("have.value", "no categories found");
  } else {
    cy.get(".categories-options").should("have.length.gt", 1);
  }
});
