# As a data inputter part of the admin staff, 
# I want to edit promotion post entries in the “pending posts” button (consists of image + description)
# so that I can fill in the required fields of product key words for it to be posted on the live app

Feature: View pending posts list and edit erronous details

Scenario: Navigating to pending post tab
    Given that I am logged in and on the overview page as a developer
    When I click on "Pending Posts" tab
    Then I should be redirected to the correct Pending Posts url

Scenario: Edit first post details in pending post tab
    Given that I click on the "Pending Post" tab
    When I click on the number "1" entry in the Pending Post page
    Then I should be redirected to edit url of the number "1" entry in the Pending Post page

Scenario: Going back to pending page from edit page
    Given that I am in the edit post tab
    When I click on the "Back to Pending Page" button
    Then I should be redirected to the Pending Posts url

Scenario: Going to live page after submitting on edit page
    Given that I am on the edit url of the number "1" entry in the Pending Post page
    When I click on the "Submit" button
    Then the number "1" entry in the Pending Post page should be updated to the live page
    And the number "1" entry in the Pending Post page should be deleted
