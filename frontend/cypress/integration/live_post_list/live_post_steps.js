// Navigating to live post tab
Given(/^I am on the "(.*)" page as a developer$/, (tabSelector) => {
  cy.log("hello");
  cy.visit("http://localhost:4200");
  cy.get("#loginEmail").type("nigel_mun@mymail.sutd.edu.sg");
  cy.get("#loginPassword").type("123123");
  cy.get("#login-button").click();
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

// navigating to a specific entry
Given(/^that I click on the "(.*)" tab$/, (tabSelector) => {
  cy.visit("http://localhost:4200");
  cy.get("#loginEmail").type("nigel_mun@mymail.sutd.edu.sg");
  cy.get("#loginPassword").type("123123");
  cy.get("#login-button").click();
  let tabSel = tabSelector.toLowerCase().replace(" ", "-");
  cy.get("#" + tabSel + "-tab").click();
});
When(/^I click on one of the "(.*)" post$/, (selector) => {
  let sel = selector.toLowerCase().replace(" ", "-");
  cy.get(".col").first().click();
});

Then(
  /^I should be able to see the "(.*)" fields of the selected post$/,
  (selectors) => {
    let selectorList = selectors.split(", ");
    for (let selector of selectorList) {
      let sel = selector.toLowerCase().replace(" ", "-");
      cy.get("#" + sel + "-field").should("exist");
    }
  }
);

Given(
  /^that I am able to view the "(.*)" fields of the selected post I am on$/,
  (selectors) => {}
);
Then(
  /^I can click on the "(.*)" fields to edit the selected post$/,
  (selectors) => {
    // let selectorList = selectors.split(", ");
    // for (let selector of selectorList) {
    //   let sel = selector.toLowerCase().replace(" ", "-");
    //   cy.get("#" + sel + "-field")
    //     .find("#" + sel + "-box")
    //     .should("exist");
    // }
  }
);
