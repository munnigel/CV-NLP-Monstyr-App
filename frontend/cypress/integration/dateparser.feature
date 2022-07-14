# As a date inputter part of the admin staff,
# I want to be able to automatically get start and end dates of each pending post
# So that I am able to process the data from the post faster

Feature: Automatically generate start and end promotion dates

Scenario: Generating start date when date is present in product description
    Given I am on "Edit Item Page" for a particular pending post
        When I click on the Start Date Generate
        Then the start date of the promotion should appear in the "Start Date" text box


Scenario: Generating end date when date is present in product description
    Given I am on "Edit Item Page" for a particular pending post
        When I click on the End Date Generate
        Then the end date of the promotion should appear in the "End Date" text box


Scenario: Attempting to generate start date when date is not present in product description
    Given I am on "Edit Item Page" for a particular pending post with no date
        When I click on the Start Date Generate
        Then the Start Date text box should remain empty


Scenario: Attempting to generate end date when date is not present in product description
    Given I am on "Edit Item Page" for a particular pending post with no date
        When I click on the End Date Generate
        Then the "End Date" text box should remain empty