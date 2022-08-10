Feature: Automatically generate title from pending post text
As a data inputter part of the admin staff,
I want to be able to automatically get suggested titles of each pending post,
So that I am able to process the data from the post faster

Scenario: Generating title when text is present in product description
    Given I am on "Edit Item Page" for a particular pending post
    And the pending post has a text description
    When I click on the "generate title" button
    Then I should see a dropdown list of title suggestions

Scenario: Accepting suggested title
    Given I see a dropdown list of titles
    When I click on a suitable title related to the post
    Then the title should be inserted into the "enter title" text area

Scenario: Attempting to generate title when text is not present in product description
    Given I am on "Edit Item Page" for an empty pending post
    When I click on the "generate title" button
    Then I should not see any dropdown list of suggestions
    
Scenario: Manually input title when generated title is wrong or is unable to be generated
    Given I am on "Edit Item Page" for a particular pending post
    When I click on the "format" button
    Then I should see a dropdown list of standardized title formats
    When I click on a title format
    Then I should be able to manually fill in the relevant text fields
    And a final string of the title should be shown