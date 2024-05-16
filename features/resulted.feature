Feature: 
As a court officer
I want to perform resulted actions
So that the cases have all the relavant information

Scenario Outline: Test resulted journey

Given I am an authenticated user
When I select a '<court>'
Then I should be on case list page

When I add a note on a '<case>'
And I send the case to '<Outcome>'
And I verify the case has been moved to outcome

When I assign the case '<number>' to me
And I verify the cases has been moved to in-progress
Then I verify the case count on "in-progess" tab

When I assign the case '<number>' to me from case summary page
And I verify the cases has been moved to in-progress
Then I verify the case count on "in-progess" tab

When I click on a case summary page
And I select 'link to nDelius' from the dropdown
And I enter CRN number of the defendent
Then I should see the success message

When I click on 'move to resulted' on a case
Then I should see the case has been moved to resulted


Examples:
|Outcome|case|number|
|Probation sentence|single||