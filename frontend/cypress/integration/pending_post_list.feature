Feature: View pending posts list

Scenario: Navigating to pending post tab
    Given that I am logged in and on the overview page
    When I click on 'Pending Posts' tab
    Then I should be redirected to the correct url


Scenario: Edit first post details in pending post tab
    Given that I am in the Pending Post tab
    When I click on the first Pending Post entry
    Then I should be redirected to the correct url


Scenario: Edit last post details in pending post tab
    Given that I am in the Pending Post tab
    When I click on the last Pending Post entry
    Then I should be redirected to the correct url

Scenario: Going back to pending page from edit page
    Given that I am in the edit post tab
    When I click on the 'Back to Pending Page' button
    Then I should be redirected to the correct url

Scenario: Going to live page after submitting on edit page
    Given that I am in the edit post tab
    When I click on the 'Submit' button
    Then I should be redirected to the correct url
