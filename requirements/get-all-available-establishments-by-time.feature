Feature: Get All Available Establishments by Time

    I as a visitor, I want to be able to access all the establishments
    available within a certain time to choose one and make my appointment.


    Scenario: There are no properties available
        Given I am a visitor
        Given the search for all establishments
        When do I inform the start time and end time
        And there are no establishments available within the start and end times
        Then an empty list or an unavailable establishments error should be returned

    Scenario: There are establishments available
        Given I am a visitor
        Given the search for all establishments
        When do I inform the start time and end time
        And are there any establishments available within the start and end times
        Then a list with the establishments should be returned.


Usecase: Get All Available Establishments By Time

InputData: Start time and End Time
OutputData: List of Establishments or empty list

- [ ] Should return invalid parameter error if start time is invalid
- [ ] Should return invalid parameter error if end time is invalid
- [ ] Should return an empty list if there is no establishment available within the specified time
- [ ] Must return a list with the establishments available within the informed time
