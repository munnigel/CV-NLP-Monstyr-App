Feature: Automatically generate categories from pending post image
As a data inputter part of the admin staff, 
I want to be able to automatically get categories of each pending post,
So that I am able to process the data from the post faster

Scenario: Generating categories when text is present in product description
    Given I am on "Edit Item Page" for a particular pending post
    And the pending post has a text description
    When I click on the "generate categories" button
    And I click on the "enter categories" text area
    Then I should see a dropdown list of categories

Scenario: Accept categories
    Given I see a dropdown list of categories
    When I click on a suitable category related to the post
    Then I should not see a dropdown list of categories
    And the category should be inserted into the "enter categories" text area


Scenario: Attempting to generate categories when text is not present in product description
    Given I am on "Edit Item Page" for an empty pending post
    When I click on the "generate categories" button
    Then I should see an empty "enter categories" text area
    When I click on the "enter categories" text area
    Then I should see "no categories found" options
    
Scenario: Manually input categories when generated categories is wrong or is unable to be generated
    Given I am on "Edit Item Page" for a particular pending post
    When I click on the "enter categories" text area
    When I type a new categories and press the "enter" key
    Then the new tag should be inserted into the "enter tags" text area
