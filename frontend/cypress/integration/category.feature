Feature: Automatically generate categories
As a date inputter part of the admin staff, 
I want to be able to automatically get categories of each pending post,
So that i am able to process the data from the post faster

    Scenario: Generating categories when text is present in product description
        Given I am on "Edit Item Page" for a particular pending post
        When I click on the "generate categories" button
        Then I should see the "categories generated successfully" sign
        When I click on the "enter categories" text area
        Then I should see "categories" options

    Scenario: Attempting to generate categories when text is not present in product description
        Given I am on "Edit Item Page" for a particular pending post
        When I click on the "generate categories" button
        Then I should see the "categories generated failure" sign
        