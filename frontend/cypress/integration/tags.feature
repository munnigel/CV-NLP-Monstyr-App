Feature: Automatically generate tags from pending post image
As a data inputter part of the admin staff,
I want to be able to automatically get suggested tags for each pending post,
So that I am able to process the data from the post faster

Scenario: Generating tags when post has an attached image
    Given I am on "Edit Item Page" for a particular pending post
    And the pending post has an attached image
    When I click on the "generate tags" button
    And I click on the "enter tags" text area
    Then I should see a dropdown list of tags

Scenario: Accept tag
    Given I see a dropdown list of tags
    When I click on a suitable tag related to the post
    Then the tag should be inserted into the "enter tags" text area

Scenario: Creating a tag not present in generated suggestions
    Given I am on "Edit Item Page" for a particular pending post
    And I click on the "enter tags" text area
    When I type a new tag and press the "enter" key
    Then the new tag should be inserted into the "enter tags" text area

Scenario: Saving tags to post
    Given I am on "Edit Item Page" for a particular pending post
    When I click the "submit" button
    Then the accepted tags should be added to the post

