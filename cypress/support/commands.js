// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import "cypress-localstorage-commands"


Cypress.Commands.add('login', () => {
    cy.request({
        method: 'post',
        url: '/api/auth/login',
        body: {
            email: Cypress.env('email'),
            password: Cypress.env('password')
        }
    }).then(res => {
        // cy.log(res)
        expect(res.body.token).exist
        const { token } = res.body
        return token
    })
})


Cypress.Commands.add('loginWeb', () => {
    cy.visit('/')
    cy.contains('Login').click()

    cy.get('#email').type(Cypress.env('email'))
    cy.get('#password').type(Cypress.env('password'))
    cy.contains('ENTRAR').click()

    cy.wait(200)
    cy.getLocalStorage('events-token')
        .then(token => {

            cy.log(`cy.setLocalStorage('events-token', '${token}')`)

        })
})