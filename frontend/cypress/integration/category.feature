Feature: Automatically generate categories
As a data inputter part of the admin staff, 
I want to be able to automatically get categories of each pending post,
So that I am able to process the data from the post faster

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
        When I click on the "enter categories" text area
        Then I should see "no categories found" options
        
    Scenario: Manually input categories when generated categories is wrong or is unable to be generated
        Given I am on "Edit Item Page" for a particular pending post
        When I type "discount, online exclusive sales" in the "input category" text area
        And I click on the "submit" button
        Then I should be on the "live posts" page 
        And I should see the same post on the "live posts" page
        And the post should have "discount, online exclusive sales" in its "category" section