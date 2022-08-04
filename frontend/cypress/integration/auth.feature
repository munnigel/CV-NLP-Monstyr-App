Feature: Authenticate eligible users to access the Monstyr X AI platform
As a data inputter of the admin staff,
I want to be able to access the Monstyr X AI platform but not allow random access to the platform,
So that I am able to process and ensure that only appropriate posts are displayed to customers

# Account creation
Scenario: Creating a user account using an email address from the monstyr.com domain and password of at least 6 characters
    Given I am on the "Create User Account Page"
        When I fill in my name
        And I fill in a unique username
        And I fill in an email address from the monstyr.com domain
        And I fill in a password of at least 6 characters
        And I select a role from the dropdown menu
        When I click on the "Sign Up" button
        Then I should be able to create a user account

Scenario: Creating a user account using an email address from the monstyr.com domain and password of less than 6 characters
    Given I am on the "Create User Account Page"
        When I fill in my name
        And I fill in a unique username
        And I fill in an email address from the monstyr.com domain
        And I fill in a password of less than 6 characters
        And I select a role from the dropdown menu
        When I click on the "Sign Up" button
        Then I should not be able to create a user account

Scenario: Creating a user account using an email address not from monstyr.com domain
    Given I am on the "Create User Account Page"
        When I fill in my name
        And I fill in a unique username
        And I fill in an email address not from the monstyr.com domain
        And I fill in a password of at least 6 characters
        And I select a role from the dropdown menu
        When I click on the "Sign Up" button
        Then I should not be able to create a user account



# Login
Scenario: Logging in with a registered and verified email account and correct password
    Given I am on the "Login Page"
        When I fill in a registered email address from the monstyr.com domain
        And The registered account has been verified via the confirmation link sent to the email address
        And I fill in the corresponding password for that account
        When I click on the "Sign In" button
        Then I should be able to access the live posts page
        And I should be able to access the pending posts page

Scenario: Logging in with a registered and verified email account and incorrect password
    Given I am on the "Login Page"
        When I fill in a registered email address from the monstyr.com domain
        And The registered account has been verified via the confirmation link sent to the email address
        And I fill in a wrong password for that account
        When I click on the "Sign In" button
        Then I should not be able to access the live posts page
        And I should not be able to acccess the pending posts page

Scenario: Logging in with a registered but unverified email account
    Given I am on the "Login Page"
        When I fill in a registered email address from the monstyr.com domain
        And The registered account has not been verified via the confirmation link sent to the email address
        And I fill in the corresponding password for that account
        When I click on the "Sign In" button
        Then I should not be able to access the live posts page
        And I should not be able to acccess the pending posts page

Scenario: Logging in with an unregistered email account
    Given I am on the "Login Page"
        When I fill in an unregistered email address
        And I fill in a password for that account
        When I click on the "Sign In" button
        Then I should not be able to access the live posts page
        And I should not be able to acccess the pending posts page