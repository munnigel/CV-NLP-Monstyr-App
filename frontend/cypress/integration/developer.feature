Feature: Manual selection of image/description of a promotion to use to test other features

    Scenario: Option to select post from developer tools
        Given I am on the home page
        When I click on the "developer-tools" tab
        Then I should be on the "Dev-tools" tab
        * I should be able to see "choose-live, choose-pending, choose-manually" buttons

    Scenario: Able to view and select from a list of live posts
        Given I am on the "Dev-tools" tab
        When I click on the "choose-live" button
        Then I should be on the "choose-live" sub-tab
        * I should see a list of "live" posts which I can select from

    Scenario: Able to return to select post options using back button from choose-live tab
        Given  I am on the "choose-live" sub-tab
        When I click on the "back" button
        Then I should be on the "select-post" sub-tab

    Scenario: Able to view and select from a list of pending posts
        Given I am on the "Dev-tools" tab
        When I click on the "choose-pending" button
        Then I should be on the "choose-pending" sub-tab
        * I should see a list of "pending" posts which I can select from

    Scenario: Able to return to select post options using back button from choose-pending tab
        Given I am on the "choose-pending" sub-tab
        When I click on the "back" button
        Then I should be on the "select-post" sub-tab

    Scenario: Able to upload a post from local file
        Given I am on the "Dev-tools" tab
        When I click on the "choose-manually" button
        Then I should be on the "choose-manually" sub-tab

    Scenario: Able to return to select post options using back button from choose-manually tab
        Given I am on the "choose-manually" sub-tab
        When I click on the "back" button
        Then I should be on the "select-post" sub-tab

    Scenario: Viewing OCR data from select post nav tab
        Given I am on the "Dev-tools" tab
        When I click on the "ocr" nav-tab
        Then I should be on the "ocr" nav-tab

    Scenario: Viewing OD data from select post nav tab
        Given I am on the "Dev-tools" tab
        When I click on the "od" nav-tab
        Then I should be on the "od" nav-tab

    Scenario: Viewing NER data from select post nav tab
        Given I am on the "Dev-tools" tab
        When I click on the "ner" nav-tab
        Then I should be on the "ner" nav-tab

    Scenario: Viewing keyword extraction data from select post nav tab
        Given I am on the "Dev-tools" tab
        When I click on the "keyword" nav-tab
        Then I should be on the "keyword" nav-tab

# Scenario: Viewing OCR data from ocr nav tab
#     Given I am on the "ocr" nav-tab
#     When I click on the "select-post" nav-tab
#     Then I should be on the "select-post" nav-tab

# Scenario: Viewing OD data from ocr nav tab
#     Given I am on the "ocr" nav-tab
#     When I click on the "od" nav-tab
#     Then I should be on the "od" nav-tab

# Scenario: Viewing NER data from ocr nav tab
#     Given I am on the "ocr" nav-tab
#     When I click on the "ner" nav-tab
#     Then I should be on the "ner" nav-tab

# Scenario: Viewing keyword extraction data from ocr nav tab
#     Given I am on the "ocr" nav-tab
#     When I click on the "keyword" nav-tab
#     Then I should be on the "keyword" nav-tab

# Scenario: Viewing OCR data from od nav tab
#     Given I am on the "od" nav-tab
#     When I click on the "ocr" nav-tab
#     Then I should be on the "ocr" nav-tab

# Scenario: Viewing OD data from od nav tab
#     Given I am on the "od" nav-tab
#     When I click on the "select-post" nav-tab
#     Then I should be on the "select-post" nav-tab

# Scenario: Viewing NER data from od nav tab
#     Given I am on the "od" nav-tab
#     When I click on the "ner" nav-tab
#     Then I should be on the "ner" nav-tab

# Scenario: Viewing keyword extraction data from d nav tab
#     Given I am on the "od" nav-tab
#     When I click on the "keyword" nav-tab
#     Then I should be on the "keyword" nav-tab

# Scenario: Viewing OCR data from ner nav tab
#     Given I am on the "ner" nav-tab
#     When I click on the "ocr" nav-tab
#     Then I should be on the "ocr" nav-tab

# Scenario: Viewing OD data from ner nav tab
#     Given I am on the "ner" nav-tab
#     When I click on the "od" nav-tab
#     Then I should be on the "od" nav-tab

# Scenario: Viewing NER data from ner nav tab
#     Given I am on the "ner" nav-tab
#     When I click on the "select-post" nav-tab
#     Then I should be on the "select-post" nav-tab

# Scenario: Viewing keyword extraction data from ner nav tab
#     Given I am on the "ner" nav-tab
#     When I click on the "keyword" nav-tab
#     Then I should be on the "keyword" nav-tab

# Scenario: Viewing OCR data from keyword nav tab
#     Given I am on the "keyword" nav-tab
#     When I click on the "ocr" nav-tab
#     Then I should be on the "ocr" nav-tab

# Scenario: Viewing OD data from keyword nav tab
#     Given I am on the "keyword" nav-tab
#     When I click on the "od" nav-tab
#     Then I should be on the "od" nav-tab

# Scenario: Viewing NER data from keyword nav tab
#     Given I am on the "keyword" nav-tab
#     When I click on the "ner" nav-tab
#     Then I should be on the "ner" nav-tab

# Scenario: Viewing keyword extraction data from keyword nav tab
#     Given I am on the "keyword" nav-tab
#     When I click on the "select-post" nav-tab
#     Then I should be on the "select-post" nav-tab

