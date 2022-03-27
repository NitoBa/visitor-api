Feature: Register a new visitor

    I as a visitor would like to be able to perform
    an appointment to a particular establishment

    Scenario: User not registered
        Given the request for a new user registration
        When this user is not yet registered
        And send the name, email and password fields correctly
        this user must be registered again on the platform
        Then a success message should be returned to the customer

    Scenario: User already registered
        Given the request for a new user registration
        When this user sends the email and password fields
        And this user is already registered on the platform
        Then an error message from an already existing user should be returned


Usecase: Register a new visitor

- [x]  Deve retornar um erro se os parâmetros name, email e password forem vazios
- [x]  Deve retornar um erro de nome inválido se o name for inválido
- [x]  Deve retornar um erro de email inválido se email for inválido
- [x]  Deve retornar um erro de password inválido se o password for inválido
- [x]  Deve retornar um erro de visitante existente se o visitante já estiver registrado
- [x]  Deve registrar um novo visitante com sucesso e retornar nada
