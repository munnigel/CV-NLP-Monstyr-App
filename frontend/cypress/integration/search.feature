Feature: Search through live posts
As a data inputter part of the admin staff,
I want to be able to find a specific live post,
So that I am able to edit any updated, missing or wrong information.

Scenario: Search for live post by title
    Given I am on the "live posts tab"
    And I click on the search text box
    And I type in a title of a live post and press enter
    Then I should be able to see posts with titles that contain those search terms

Scenario: Search for live post by tags
    Given I am on the "live posts tab"
    And I click on the search text box
    And I type in a tag of a live post and press enter
    Then I should be able to see posts with tags that contain those search terms

Scenario: Search for live post by categories
    Given I am on the "live posts tab"
    And I click on the search text box
    And I type in a category of a live post and press enter
    Then I should be able to see posts with categories that contain those search terms

Scenario: Search for live post by date
    Given I am on the "live posts tab"
    And I click on the search text box
    And I type in a date of a live post and press enter
    Then I should be able to see posts with dates that contain those search terms

Scenario: Search nothing in the search bar
    Given I am on the "live posts tab"
    And I click on the search text box
    And I do not type anything and press enter
    Then I should be able to see all live posts