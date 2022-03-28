Feature: Get a Establishment by id

    As a visitor, I want to be able to search for an establishment to make my appointment

    Scenario: There is no establishment in the system with the name *(id)* informed

        Given the search for an appointment
        When I inform the name of the establishment *(id)*
        And this establishment does not exist with the *(id)* informed
        Then a non-existent establishment error message should be returned.

    Scenario: There is the establishment available with the name *(id)* informed
        Given the search for an establishment
        When I inform the name of the establishment *(id)*
        And this establishment exists in the system with the *(id)* informed
        Then the information of the searched establishment must be returned.

Get Establishment By Id

- [x] Should return an error message with missing parameters if the id is not informed
- [x] Should return an error message with invalid parameter if the id entered is invalid
- [x] Should return an error message with establishment not found if with the given id no establishment is found in the system
- [x] Must return an establishment if with the informed id an establishment is found in the system
