Feature: View pending posts and input key fields to be posted on live tab
As a data inputter part of the admin staff, 
I want to edit promotion post entries in the “pending posts” button (consists of image + description)
so that I can fill in the required fields of product key words for it to be posted on the live app

Scenario: Navigating to pending post tab
    Given I am on the "Overview" page as a developer
    When I click on the "Pending Posts" tab
    Then I should be on the "Pending Posts" page

Scenario: Navigating to specific entry of Pending Post
    Given that I click on the "Pending Posts" tab
    When I click on one of the "Pending" post
    Then I should be able to see the "Title, Tag, Category, Start Date, End Date" fields of the selected post

Scenario: Able to go back to pending page from edit page using back button
    Given that I am in the edit post tab
    When I click on the 'Back to Pending Page' button
    Then I should be redirected to the Pending Posts tab

Scenario: Going to live page after submitting on edit page
    Given that I am able to view the "Title, Tag, Category, Start Date, End Date" fields of the selected Pending post I am on
    When I click on the 'Submit' button
    Then I should be redirected to the Live Posts page 

Scenario:Checking if live post that was uploaded in specific has the required fields filled
    Given that I click on the uploaded post which can be seen at the first index of the page
    Then I should be able to see the same "Title, Tag, Category, Start Date, End Date" fields that I added when I published the post
