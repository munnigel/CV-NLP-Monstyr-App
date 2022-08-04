import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";

// Scenario: Creating a user account using an email address from the monstyr.com domain and password of at least 6 characters
Given(/^I am on the "Create User Account Page"$/, () => {
  cy.visit("http://localhost:4200/add");
  // cy.get(".pending-posts-item").eq(5).click();
});

When("I fill in my name", () => {
  cy.get("#name-textbox").type("Jack");
});

And("I fill in a unique username", () => {
  cy.get("#username-textbox").type(gen_rand_string(10));
});

And("I fill in an email address from the monstyr.com domain", () => {
  cy.get("#email-textbox").type(gen_rand_string(10)+"@monstyr.com");
});

And("I fill in a password of at least 6 characters", () => {
  cy.get("#password-textbox").type(gen_rand_string(10));
});

And("I select a role from the dropdown menu", () => {
  cy.get("#acc-type-dropdown").select('developer');
});

When(/^I click on the "Sign Up" button$/, () => {
  cy.get("#sign-up-button").click({ force: true });
});

Then("I should be able to create a user account", () => {
  cy.location().should((loc) => {
    expect(loc.pathname.toString()).to.contain('/login');
  });
})



// Generates a random string of length specified by the single input argument
function gen_rand_string(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
 return result;
}