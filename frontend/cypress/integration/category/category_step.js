import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";


// Scenario: Generating categories when text is present in product description
Given(/^I am on "Edit Item Page" for a particular pending post$/, () => {
  cy.visit("http://localhost:4200/home/pending");
  cy.get(".pending-posts-item").eq(0).click();
});

And("the pending post has a text description", () => {
  cy.get(".page-item-description").should("not.be.empty");
});

When('I click on the "generate categories" button', () => {
  cy.get("#generate-categories-btn").click({ force: true });
});
And('I click on the "enter categories" text area', () => {
  cy.get(".categoryInput").click({ force: true });
});

Then("I should see a dropdown list of categories", (optionSelector) => {
  cy.get("#categories-options").should("exist");
});


// Scenario: Accept categories
Given("I see a dropdown list of tags", (optionSelector) => {
  cy.get("#categories-options").should("exist");
});

When("I click on a suitable tag related to the post", () => {
  cy.get("#categories-options").first().click({ force: true });
});




// When(/^I click on the "(.*)" button$/, (buttonSelector) => {
//   let temp = buttonSelector.replace(" ", "-");
//   temp += "-btn";
//   cy.get("#" + temp).click();
// });

// Then(/^I should see the "(.*)" sign$/, (iconSelector) => {
//   let temp = iconSelector.replace(" ", "-");
//   cy.get("#" + temp).should("exist");
// });

// When(/^I click on the "(.*)" text area$/, (selector) => {
//   let temp = selector.replace(" ", "-");
//   cy.get("#" + temp).click();
// });

// Then(/^I should see "(.*)" options$/, (optionSelector) => {
//   if (optionSelector.includes("no")) {
//     cy.get(".categories-options").should("have.value", "no categories found");
//   } else {
//     cy.get(".categories-options").should("have.length.gt", 1);
//   }
// });
