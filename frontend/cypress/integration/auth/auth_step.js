import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
var request = require('request');

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

// Scenario: Creating a user account using an email address from the monstyr.com domain and password of less than 6 characters
And("I fill in a password of less than 6 characters", () => {
  cy.get("#password-textbox").type(gen_rand_string(5));
})

Then("I should not be able to create a user account", () => {
  cy.location().should((loc) => {
    expect(loc.pathname.toString()).to.contain('/add');
  });
})

// Scenario: Creating a user account using an email address not from monstyr.com domain
And("I fill in an email address not from the monstyr.com domain", () => {
  cy.get("#email-textbox").type(gen_rand_string(10)+"@hotmail.com");
});

// Scenario: Logging in with a registered and verified email account and correct password
Given(/^I am on the "Login Page"$/, () => {
  cy.visit("http://localhost:4200/login");
});

When("I fill in a registered email address from the monstyr.com domain", () => {
  cy.get("#loginEmail").type("verified@monstyr.com");
});

And("The registered account has been verified via the confirmation link sent to the email address", () => {
  // cy.get("#loginEmail").type(getToken());
  // cy.log(getToken()).wait(1000);
  cy.request({
      method:'POST', 
      url:'https://rubyduckies-rails-backend-wmma3ffcjq-as.a.run.app/auth/login',
      body: {
        'email': "abramtjh@gmail.com",
        'password': "test_password",
      }
    })
    .as('loginResponse')
    .then((response) => {
      Cypress.env('token', response.body.token); // either this or some global var but remember that this will only work in one test case
      // xToken = response.body.token;
      // cy.log(xToken);
      // return response;
    })
    .its('status')
    .should('eq', 200);

    const xToken = Cypress.env("token");

    cy.log(xToken);

    cy.request({
      method: 'GET',
      form: true,
      url:'https://rubyduckies-rails-backend-wmma3ffcjq-as.a.run.app/users/35',
      headers: {
        'Content-Type': 'text/html',  
        'Authorization': xToken,
      },
      body: {       
        // "email": "your email",
        // //"username": "your username", depends upon your system login you could use email or username
        // "password": "your password",
      }})
      .as('usersResponse')
      .then((response) => {
        // Cypress.env('user_confirmation', response.body.token);
        var userConfirmation = response.body.email_confirmed;
        cy.expect(userConfirmation).to.be.true;
      })
      .its('status')
      .should('eq', 200);
    })

And("I fill in the corresponding password for that account", () => {
  cy.get("#loginPassword").type("test_password");
});

When(/^I click on the "Sign In" button$/, () => {
  cy.get("#login-button").click({ force: true }).wait(3000);
})

Then("I should be able to access the live posts page", () => {
  cy.visit("http://localhost:4200/home/processed");
  // cy.get('#live-posts-tab').click({ force: true });
})

And("I should be able to access the pending posts page", () => {
  cy.visit("http://localhost:4200/home/pending");
  // cy.get('#pending-posts-tab').click();
})

// Scenario: Logging in with a registered and verified email account and incorrect password
And("I fill in a wrong password for that account", () => {
  cy.get("#loginPassword").type("wrongpassword");
})

Then("I should not be able to access the live posts page", () => {
  cy.visit("http://localhost:4200/home/processed");
  // cy.get('#live-posts-tab').click({ force: true });
})

And("I should not be able to access the pending posts page", () => {
  cy.visit("http://localhost:4200/home/pending");
  // cy.get('#pending-posts-tab').click();
})

// Scenario: Logging in with a registered but unverified email account
And("I fill in a registered email address from monstyr.com", () => {
  cy.get("#loginEmail").type("unverified@monstyr.com");
});

And("The registered account has not been verified via the confirmation link sent to the email address", () => {
  cy.request({
      method:'POST', 
      url:'https://rubyduckies-rails-backend-wmma3ffcjq-as.a.run.app/auth/login',
      body: {
        'email': "abramtjh@gmail.com",
        'password': "test_password",
      }
    })
    .as('loginResponse')
    .then((response) => {
      Cypress.env('token', response.body.token); // either this or some global var but remember that this will only work in one test case
      // xToken = response.body.token;
      // cy.log(xToken);
      // return response;
    })
    .its('status')
    .should('eq', 200);

    const xToken = Cypress.env("token");

    cy.log(xToken);

    cy.request({
      method: 'GET',
      form: true,
      url:'https://rubyduckies-rails-backend-wmma3ffcjq-as.a.run.app/users/42',
      headers: {
        'Content-Type': 'text/html',  
        'Authorization': xToken,
      },
      body: {       
        // "email": "your email",
        // //"username": "your username", depends upon your system login you could use email or username
        // "password": "your password",
      }})
      .as('usersResponse')
      .then((response) => {
        // Cypress.env('user_confirmation', response.body.token);
        var userConfirmation = response.body.email_confirmed;
        cy.expect(userConfirmation).to.be.false;
      })
      .its('status')
      .should('eq', 200);
    })

// Scenario: Logging in with an unregistered email account
And("I fill in an unregistered email address", () => {
  cy.get("#loginEmail").type("unregistered@hotmail.com");
});

And("I fill in a password for that account", () => {
  cy.get("#loginPassword").type("erggerwgjtyjrem");
});



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