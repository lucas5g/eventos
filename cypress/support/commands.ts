Cypress.Commands.add('login', (email, password) => {
  cy.request({
    method: 'post',
    url: '/api/auth/login',
    body: {
      email,
      password
    },
    failOnStatusCode:false
  }).then(({body}) => {
    // cy.log(res)
    expect(body.token).exist
    const { token } = body
    return token
  })
})


// Cypress.Commands.add('loginWeb', () => {
//     cy.visit('/')
//     cy.contains('Login').click()

//     cy.get('#email').type(Cypress.env('email'))
//     cy.get('#password').type(Cypress.env('password'))
//     cy.contains('ENTRAR').click()

//     cy.wait(200)
//     cy.getLocalStorage('events-token')
//         .then(token => {

//             cy.log(`cy.setLocalStorage('events-token', '${token}')`)

//         })
// })
declare global{
  namespace Cypress{
    interface Chainable{
      login(email:string, password:string):Chainable<{token:string}>
    }
  }
}

export {}