Feature: Login of visitor

    I as a visitor already registered on the platform,
    I want to be able to login using email and password
    to enter the platform to make my appointments

    Scenario: User already registered

        Given the request for a login, I send my email and password
        When this user is already registered on the platform
        Then a token must be returned for scheduling access on the platform

    Scenario: User not registered

        Given the request for a login, I send my email and password
        When this user is not registered on the platform
        Then a user not found error should be returned

Usecase: Authenticate visitor

- [ ] Should return invalid parameters error if email and password are not provided
- [ ] Should return an email error if the email is invalid
- [ ] Should return a password error if the password is invalid
- [ ] Should return a non-existent visitor error if the visitor is not registered
- [ ] Must return an authentication token if the visitor is successfully authenticated
