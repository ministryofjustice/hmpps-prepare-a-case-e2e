Feature: 
As a court officer
I want to perform precourt actions
So that the cases have all the relavant information

Scenario Outline: test pre-court journey
Given I am an authenticated user
When I select a '<court>'
And I should be on  case list page
When I select the filter '<probation status>', '<court room>', '<session source>', '<flag>' 
And I add, edit and delete the comment on a case
And I upload mutiple invalid documents
And I should see the error message
And I upload mutiple valid documents
And I open a '<document>'
And I delete a '<document>'
And I change admin prep '<status>' 
Then I verify risk register and probation

#upload document- delete document, open document, upload multiple document, drag and drop a document, incorrect files
#Then I see the court room hearings page with defendant name "Hope Heathcote"

  Examples:
  |court|probation status|court room|session|source|flag|document|status|
  |Sheffield Magistrates' Court|Current|Crown Court 3-1|Morning|Common Platform|Breach||complete|
