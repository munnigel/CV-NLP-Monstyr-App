# As a data inputter part of the admin staff,
# I want to be able to view posts that have been posted
# so that I am able to confirm that there are no errors in the various fields


Feature: View live posts and edit erronous details

Scenario: Navigating to Live Post tab
    Given that I am logged in and on the overview page as a developer
    When I click on "Live Posts" tab
    Then I should be redirected to the correct Live Posts url

Scenario: Navigating to specific entry of Live Post
    Given that I click on the "Live Post" tab
    When I click on the number "1" entry in the Live Post page
    Then I should be redirected to edit url of the number "1" entry in the Live Post page

Scenario: Edit chosen entry of Live Post
    Given that I am on the edit url of the number "1" entry
    When I click on the "Title" field and edit the Title to "New Title"
    And I click on the "Description" field and edit the description to "New Description"
    And I click on the "Category" field and edit the category to "New Category"
    And I click on the "Date" field and edit the date to "New Date"
    When I click on the "Submit" button
    Then the number "1" entry in the Live Post page contains "New Title", "New Description", "New Category", "New Date"

Scenario: Able to return to Live Posts page using back button from edit url of number "1" entry
    Given that I am on the edit url of the number "1" entry
    When I click on the 'Back to Live Page' button
    Then I should be redirected to the Live Posts url
