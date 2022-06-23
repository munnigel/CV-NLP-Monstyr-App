Feature: View live posts list

Scenario: Navigating to live post tab
    Given that I am logged in and on the overview page
    When I click on 'Live Posts' tab
    Then I should be redirected to the correct url

Scenario: Edit first post details in the live post tab
    Given that I am in the Live Post tab
    When I click on the first Live Post entry
    Then I should be redirected to the first live edit url

Scenario: Edit first post details in the live post tab
    Given that I am in the Live Post tab
    When I click on the last Live Post entry
    Then I should be redirected to the last live edit url

Scenario: Going back to live page from edit page
    Given that I am in the edit post tab
    When I click on the 'Back to Live Page' button
    Then I should be redirected to the live url
