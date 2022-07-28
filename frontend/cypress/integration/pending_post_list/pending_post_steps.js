import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";

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

Given('that I click on the "Pending Posts" tab', () => {
  cy.visit("http://localhost:4200/home/pending");
});

When('I click on one of the "Pending" post', () => {
  cy.get(".pending-posts-item").eq(0).click();
});

Then(
  'I should be able to see the "Title, Description, Category, Start Date, End Date" fields of the selected post',
  () => {
    cy.get(".page-item-title").should("exist");
    cy.get(".page-item-description").should("exist");
    cy.get(".titleInput").should("be.visible");
    cy.get(".tagInput").should("be.visible");
  }
);

//Scenario: Able to go back to pending page from edit page using back button

Given("that I am in the edit post tab", () => {
  cy.visit("http://localhost:4200/edit/0");
});

When("I click on the 'Back to Pending Page' button", () => {
  cy.get("#back-to-pending").click({ force: true });
});

Then("I should be redirected to the Pending Posts tab", () => {
  cy.url().should("eq", "http://localhost:4200/home/pending");
});

//Scenario: Going to live page after submitting on edit page

Given(
  'that I am able to view the "Title, Description, Category, Start Date, End Date" fields of the selected Pending post I am on',
  (URL) => {
    cy.get(".pending-posts-item").eq(0).click();
    cy.get(".page-item-title").should("exist");
    cy.get(".page-item-description").should("exist");
    cy.get(".categoryInput").should("be.visible");
    cy.get(".dateInput").should("be.visible");
  }
);

When("I click on the 'Submit' button", () => {
  cy.get("#go-to-live").click({ force: true });
});

Then("I should be redirected to the Live Posts page", () => {
  cy.url().should("eq", "http://localhost:4200/home/processed");
});

//checking if live post was uploaded in specific has the required fields filled
Given(
  "that I click on the uploaded post which can be seen at the first index of the page",
  () => {
    cy.url().should("eq", "http://localhost:4200/home/processed");
  }
);

Then(
  'I should be able to see the same "Title, Description, Category, Start Date, End Date" fields that I added when I published the post',
  () => {
    //visit pending
    // cy.get(".col").eq(0).click();   //click first
    // cy.url().should("include", "editLive");

    cy.get(".item-details").should("be.visible");
  }
);

// Then ('I receive an e-mail in my e-mail address box {string}', (emailAddress) => {
//   cy.task('getLastEmail').then((response) => {

//       let text = response[0]["text"]
//       let newPassword = text.slice(text.search(":") + 1 )
//       cy.wrap(newPassword).as("secret")
//       expect(response[0]["to"]["text"]).to.eq(emailAddress)

//   })
// })

// Then ('I type the password received in the e-mail in the password field', () => {
//   let password = cy.get("@secret")
//   cy.get('input[name=password]').type(password)
// })
