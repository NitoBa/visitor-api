Feature: List of all establishments available for appointments by working days

    Scenario: There are no properties available

        Given the search for all establishments
        When do I inform the days of the week filter
        And there is no establishment available within the informed days
        Then an empty list or an unavailable establishments error should be returned

    Scenario: There are establishments available

        Given the search for all establishments
        When do I inform the days of the week filter
        And there is no establishment available within the informed days
        Then a list of available establishments should be returned.


- ## Usecases

Feature: Get All Establishments by days filter

- Inputs: Operating days

- Output: List of establishments

- [ ] Should return a missing parameters error if required parameters are not provided
- [ ] Should return invalid parameter error if operation days are invalid
- [ ] Must return an empty list if there is no establishment available within the informed operating days
- [ ] It must return a list with the establishments available within the days of operation informed
