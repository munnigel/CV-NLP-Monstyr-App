import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

Given(/^I am on "(.*)" for a particular pending post$/, () => {
  cy.visit("https://localhost:4200/pending");
});
