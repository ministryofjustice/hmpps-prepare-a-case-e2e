Feature: 
As a court officer
I want to perform incourt actions
So that the I can record all the information 

Scenario Outline: test pre-court journey
Given I am an authenticated user
When I select a '<court>'
And I should be on  case list page

