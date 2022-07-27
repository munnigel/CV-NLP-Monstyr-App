Feature: Automatically generate tags from pending post image
As a data inputter part of the admin staff,
I want to be able to automatically get suggested tags for each pending post,
So that I am able to process the data from the post faster

Scenario: Generating tags when post has an attached image
    Given I am on "Edit Item Page" for a particular pending post
    And the pending post has an attached image
    When I click on the "generate tags" button
    Then I should see a dropdown list of tags

Scenario: Accept tag
    Given I see a dropdown list of tags
    When I click on the checkbox for a tag
    Then the tag should be flagged for submission

Scenario: Attempting to generate tags when post has no attached image
    Given I am on "Edit Item Page" for a particular pending post
    And the pending post has no attached image
    When I click on the "generate tags" button
    Then I should see no tags in the dropdown list

Scenario: Creating a tag not present in generated suggestions
    Given I am on "Edit Item Page" for a particular pending post
    When I click on the "enter tag" text area
    And type a new tag
    Then a new tag is added to the dropdown list of tags

Scenario: Saving tags to post
    Given I am on "Edit Item Page" for a particular pending post
    And I click the "submit" button
    Then the accepted tags should be added to the post