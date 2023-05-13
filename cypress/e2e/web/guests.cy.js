///<reference types="cypress" />

describe.skip("Frontend Guests", () => {
    it('Guests Filter and register send invite', () => {

        // cy.loginWeb()
        cy.setLocalStorage('events-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6InNlZWQ0MyIsImVtYWlsIjoic2VlZEBtYWlsLmNvbSIsInByb2ZpbGUiOiJBZG1pbiIsInVuaXR5IjoiQ29udGFnZW0iLCJpYXQiOjE2NTIyMzc4MjQsImV4cCI6MTY1MjI2NjYyNH0.m-iFw68eS9lOeKceW3KhSd6ItM5pcvcjB_0a6k8pa1o')



        cy.visit('/convidados')

        const guest = 'PEDRO HENRIQUE'
        cy.get('#search', { timeout: 5000 }).type(guest)


        cy.xpath(`//ul/li[contains(., '${guest}')]//button`)
            .first()
            .click()

        cy.contains('@aluno').click()
        cy.get('#email').should('not.have.length.above', 10)
        cy.contains('Salvar').click()

    })
})