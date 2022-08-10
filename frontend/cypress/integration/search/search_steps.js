import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";

// Scenario: Search for live post by title
Given(/^I am on the "live posts tab"$/, () => {
  cy.visit("http://localhost:4200");
  cy.get("#loginEmail").type("nigel_mun@mymail.sutd.edu.sg");
  cy.get("#loginPassword").type("123123");
  cy.get("#login-button").click();
  cy.get("#live-posts-tab").click();
});

And("I click on the search text box", () => {
  cy.get("#search-text-box").click();
});

And("I type in a title of a live post and press enter", () => {
  cy.get("#search-text-box").type("ninja").type("{enter}");
});

Then(
  "I should be able to see posts with titles that contain those search terms",
  () => {
    // cy.get("#live-post-item").eq(0).click();
  }
);

// Scenario 2
And("I type in a tag of a live post and press enter", () => {
  cy.get("#search-text-box").type("plant").type("{enter}");
});

Then(
  "I should be able to see posts with tags that contain those search terms",
  () => {
    // cy.get("#live-post-item").eq(0).click();
  }
);

// Scenario 3
And("I type in a category of a live post and press enter", () => {
  cy.get("#search-text-box").type("sports").type("{enter}");
});

Then(
  "I should be able to see posts with categories that contain those search terms",
  () => {
    // cy.get("#live-post-item").eq(0).click();
  }
);

// Scenario 4
And("I type in a date of a live post and press enter", () => {
  cy.get("#search-text-box").type("august").type("{enter}");
});

Then(
  "I should be able to see posts with dates that contain those search terms",
  () => {
    // cy.get("#live-post-item").eq(0).click();
  }
);

// Scenario 5
And("I do not type anything and press enter", () => {
  cy.get("#search-text-box").type("{enter}");
});

Then("I should be able to see all live posts", () => {
  cy.get("#live-post-item").eq(0).click();
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
Given("I see a dropdown list of categories", (optionSelector) => {
  cy.get("#categories-options").should("exist");
});

When("I click on a suitable category related to the post", () => {
  cy.get("#categories-options").first().click({ force: true });
});

Then("I should not see a dropdown list of categories", (optionSelector) => {
  cy.get("#categories-options").should("not.exist");
});

And(
  'the category should be inserted into the "enter categories" text area',
  (optionSelector) => {
    cy.get(".mat-chip-ripple").should("exist");
  }
);

// Scenario: Attempting to generate categories when text is not present in product description
Given('I am on "Edit Item Page" for an empty pending post', () => {
  cy.visit("http://localhost:4200");
  cy.get("#loginEmail").type("nigel_mun@mymail.sutd.edu.sg");
  cy.get("#loginPassword").type("123123");
  cy.get("#login-button").click();
  cy.get("#pending-posts-tab").click();
  cy.get(".pending-posts-item").eq(1).click();
});

When('I click on the "generate categories" button', () => {
  cy.get("#generate-categories-btn").click({ force: true });
});
Then('I should see an empty "enter categories" text area', (optionSelector) => {
  cy.get(".categoryInput").should("be.empty");
});
When('I click on the "enter categories" text area', () => {
  cy.get(".categoryInput").click({ force: true });
});
Then('I should see "no categories found" options', (optionSelector) => {
  cy.get(".mat-option-text").should("exist");
});

//Scenario: Manually input categories when generated categories is wrong or is unable to be generated
Given('I am on "Edit Item Page" for a particular pending post', () => {
  cy.visit("http://localhost:4200");
  cy.get("#loginEmail").type("nigel_mun@mymail.sutd.edu.sg");
  cy.get("#loginPassword").type("123123");
  cy.get("#login-button").click();
  cy.get("#pending-posts-tab").click();
  cy.get(".pending-posts-item").eq(6).click();
});
When('I click on the "enter categories" text area', () => {
  cy.get(".categoryInput").click({ force: true });
});
When('I type a new category and press the "enter" key', () => {
  cy.get(".categoryInput").type("new category").type("{enter}");
});
Then(
  'the category should be inserted into the "enter categories" text area',
  () => {
    cy.get(".mat-chip-ripple").should("exist");
  }
);

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
