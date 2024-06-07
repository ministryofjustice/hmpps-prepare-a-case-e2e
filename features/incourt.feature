Feature: 
As a court officer
I want to perform incourt actions
So that the I can record all the information 

Scenario Outline: test in-court journey

  Given I am logged in
  When I select court "Sheffield Magistrates' Court"
  Then I see the court room hearings page with defendant name "Hope Heathcote"

  Given I am viewing the hearing defendant details for '<defendant name>'
  When I add a note
  And I edit the last note
  And I delete the last note
  Then I should not see any note

  When I add a note
  And I send the case to '<Outcome Type>'
  Then the case has moved to hearing outcome '<Outcome Type>'
  And the case for '<defendant name>' has moved to outcomes

  When I set the 'Outcome type' filter to '<Outcome Type>'
  Then the outcome case count is '1'

  When I move outcome case for '<defendant name>' to in-progres
  Then the outcome case for '<defendant name>' has moved to in-progress

  When I select the filter '<Outcome Type>', '<Court room>', '<Assigned to>'
  Then I shoud see the right cases on the page

  When I click on the hearing date on the resulted page
  Then I should see the case list ordered 


  Examples:
  |Outcome|Outcome Type|Court room|defendant name|
  |Probation sentence|Probation sentence|0|Hope Heathcote|
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




Examples:
|Outcome|Outcome Type|Court room|Assigned to|case|number|court|
|Probation sentence|Probation sentence|0|single||||
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


