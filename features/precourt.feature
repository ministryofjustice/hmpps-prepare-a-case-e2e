Feature: 
As a court officer
I want to perform precourt actions
So that the cases have all the relavant information

Scenario Outline: test pre-court journey
Given I am an authenticated user
When I select a '<court>'
Then I should be on  case list page

When I select the filter '<probation status>', '<court room>', '<session source>', '<flag>' 
And I add a comment on a case
And I edit the comment on a case
And I delete the comment on a case
Then I should not see the comment on the page

When I upload invalid document
Then I should see the error message

When I upload mutiple valid documents
And I open a '<document>'
And I delete a '<document>'
Then I should not see the deleted document on the page

When I change admin prep '<status>'
Then I should see the status is changed
And I verify risk register and probation

Examples:
  |court|probation status|court room|session|source|flag|document|status|
  |Sheffield Magistrates' Court|Current|Crown Court 3-1|Morning|Common Platform|Breach||complete|
