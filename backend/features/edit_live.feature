Feature: Edit Live
    Scenario: Edit Live post 
        Given I am on the live post edit page
            And I click a post to edit
            When I edit the post
            And I click the Submit button
            Then I should be brought to the live post edit page
            And I should see the post I edited

            