Feature: Manual update

Scenario:
    Given that I am on the select post tab inside the developers tools
    When I click on ‘select a list of live promotional post’ 
    Then I should be able to see a list of live promotional post
    And select it to and use the post to test the implemented features


Scenario:
    Given that I am on the select post tab inside the developers tools
    When I click on ‘select list of pending promotional post’ 
    Then I should be able to see a list of pending promotional post
    And select it to and use the post to test the implemented features

Scenario:
    Given that I am on the select post tab inside the developers tools
    When I click on ‘select post from file’’ 
    Then I should be able to open up my file explorer
    And select a file to use the post to test the implemented features
