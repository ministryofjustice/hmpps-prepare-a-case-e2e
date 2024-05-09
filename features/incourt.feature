Feature: 
As a court officer
I want to perform incourt actions
So that the I can record all the information 

Scenario Outline: test in-court journey
Given I am an authenticated user
When I select a '<court>'
Then I should be on case list page

When I add a note on a '<case>'
And I edit the note on a '<case>'
And I delete the note on a '<case>'
Then I should not see the note on the page


When I add a note on a '<case>'
And I send the case to '<Outcome>'
Then I verify the case has been moved to hearing outcome added
And I verify the case has been moved to outcome

When I select the filters '<Outcome Type>', '<Court room>'
And I verify the right cases appear on the page after filters are applied

Examples:
|Outcome|Outcome Type|Court room|case|
|Probation sentence|Probation sentence|0||
# |Non probation sentence|Non probation sentence|1||
# |Report requested|Report requested|2||
# |Adjourned|Adjourned|3||
# |Committed to crown|Committed to crown|4||
# |Crown plus PSR|rown plus PSR|5||
# |Other|Other|6||
# |Warrent|Warrent|7||
# |Trial|Trial|8||
# |Trial|Trial|Crown Court 2-1||
# |Trial|Trial|Crown Court 3-1||
# |Trial|Trial|Crown Court 5-1||


Scenario Outline: 2 test in-court journey- case to resulted
Given I am an authenticated user
When I select a '<court>'
Then I should be on case list page


When I add a note on a '<case>'
And I edit the note on a '<case>'
And I delete the note on a '<case>'
Then I should not see the note on the page


When I add a note on a '<case>'
And I send the case to '<Outcome>'
And I verify the case has been moved to outcome

When I assign the '<number>' of case
Then I verify the cases has been moved to in-progress


When I select the filter '<Outcome Type>', '<Court room>', '<Assigned to>'
Then I shoud see the rigt cases on the page

When I click on move to resulted
Then I verify the cases has been moved to resulted


When I select the filter '<Outcome Type>', '<Court room>', '<Assigned to>'
Then I shoud see the rigt cases on the page

When I click on the hearing date on the resulted page
Then I should see the case list ordered 


Examples:
|Outcome|Outcome Type|Court room|Assigned to|case|
|Probation sentence|Probation sentence|0|single||
# |Non probation sentence|Non probation sentence|1|multiple cases||
# |Report requested|Report requested|2|all cases||
# |Adjourned|Adjourned|3|||
# |Committed to crown|Committed to crown|4|||
# |Crown plus PSR|rown plus PSR|5|||
# |Other|Other|6|||
# |Warrent|Warrent|7|||
# |Trial|Trial|8|||
# |Trial|Trial|Crown Court 2-1|||
# |Trial|Trial|Crown Court 3-1|||
# |Trial|Trial|Crown Court 5-1|||


