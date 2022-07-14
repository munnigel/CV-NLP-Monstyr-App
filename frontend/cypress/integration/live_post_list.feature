# As a data inputter part of the admin staff,
# I want to be able to view posts that have been posted
# so that I am able to confirm that there are no errors in the various fields


Feature: View live posts and edit erronous details

Scenario: Navigating to Live Post tab
    Given I am on the "Overview" page as a developer
    When I click on the "Live Posts" tab
    Then I should be on the "Live Posts" page
    
Scenario: Navigating to specific entry of Live Post
    Given that I click on the "Live Posts" tab
    When I click on one of the "Live" post
    Then I should be able to see the "Title, Description, Category, Start Date, End Date" fields of the selected post

Scenario: Edit chosen entry of Live Post
    Given that I am able to view the "Title, Description, Category, Start Date, End Date" fields of the selected post I am on
    Then I can click on the "Title, Description, Category, Start Date, End Date" fields to edit the selected post
    