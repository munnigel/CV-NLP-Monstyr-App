Feature: a sample feature to practice my testing

Scenario: displays two todo items by default
  When I open the to-do page
  Then I sign in
  And to-do item 1 is "Pay electric bill"
  And to-do item 2 is "Walk the dog"