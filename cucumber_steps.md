
# More about using Cucumber to test scenarios:
- using Gherkin - A way of writing business-readable executable specifications
- A scenario is an example formulated into Gherkin

**Scenario** tells Cucumber we’re about to describe an example that it can execute.

**Given, When and Then** identify the steps of the scenario.

- Given is the context for the scenario. 
We’re putting the system into a specific state, ready for the scenario to unfold.

- When is an action. 
Something that happens to the system that will cause something else to happen: an outcome.

- Then is the outcome. 
It’s the behaviour we expect from the system when this action happens in this context.

# step definitions: let cucumber automate Gherkin steps
Writing step definitions for **Gherkin Scenarios** in features/edit_live.features to be translated into **ruby** in /backend/features/steps.rb

## Undefined
means Cucumber doesn’t know what to do for any of the three steps we wrote in our Gherkin scenario

## Creation of Ruby file 
first step definition throws a PendingException, which causes Cucumber to stop, skip the rest of the steps, and mark the scenario as pending.
