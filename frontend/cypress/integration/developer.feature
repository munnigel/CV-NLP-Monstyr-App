### As a software developer at Monstyr in charge of automating the Monstyr promotion upload process,
# I want to be able to upload/ select a promotion post(consists of an image + description)
# so that I can test the performance of newly implemented features in a controlled manner
# And view the implemented feature results in their relevant tabs to evaluate the feature.


Feature: Manual selection of image/description of a promotion to use to test other features

## SELECT POST
    Scenario: Option to select post from developer tools tab
        Given I am on the "Overview" page as a developer
        When I click on the "Developer Tools" tab
        Then I should be on the "Developer Tools" page
        And I should be able to see "Choose Live, Choose Pending, Choose Manually" button
        
#### BACK BUTTON TEST => in Choose Live Tab
    Scenario: Able to return to select post options using back button from choose-live tab
        Given the "Choose Live" button is selected
        When I click on the "Back" button
        Then I should be able to see "Choose Live, Choose Pending, Choose Manually" button 

#### BACK BUTTON TEST => in Choose Pending Tab
    Scenario: Able to return to select post options using back button from choose-pending tab
        Given the "Choose Pending" button is selected
        When I click on the "Back" button
        Then I should be able to see "Choose Live, Choose Pending, Choose Manually" button

## CHOOSE LIVE BUTTON
    Scenario: Selecting a post from the "Choose Live" option
        Given that I click on the "Developer Tools" tab
        And the "Choose Live" button is selected
        When I click on one of the "Live" post 
        Then I should be able to see "Input Image, Processed Text" in the "OCR" section
        And I should be able to see "Processed Tags" in the "OD" section
        And I should be able to see "Extracted Keywords" in the "NER" section

## CHOOSE PENDING BUTTON
    Scenario: Selecting a post from the "Choose Pending" option
        Given that I click on the "Developer Tools" tab
        And the "Choose Pending" button is selected
        When I click on one of the "Pending" post 
        Then I should be able to see "Input Image, Processed Text" in the "OCR" section
        And I should be able to see "Processed Tags" in the "OD" section
        And I should be able to see "Extracted Keywords" in the "NER" section



## UPLOAD MANUALLY BUTTON
    Scenario: Able to upload files manually from local desktop
        Given that I click on the "Developer Tools" tab
        And the "Choose Manually" button is selected
        Then I should be able to see "Choose File" in the "Upload" section
        And I should be able to upload a file from my computer
        When I click on the "Click here to upload" button
        Then I should be able to see "Input Image, Processed Text" in the "OCR" section
        And I should be able to see "Processed Tags" in the "OD" section
        And I should be able to see "Extracted Keywords" in the "NER" section

        
## BACK BUTTON TEST => in Upload Manually Tab
    Scenario: Able to return to select post options using back button from choose-manually tab
        Given that I click on the "Developer Tools" tab
        And the "Choose Manually" button is selected
        When I click on the "back" button
        Then I should be able to see "Choose Live, Choose Pending, Choose Manually" button
