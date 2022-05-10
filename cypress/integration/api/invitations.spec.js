///<reference types="cypress" />

const invitation = {
    name: 'convite test',
    status: true
}

describe.skip('Crud invitations', () => {

    it('Create invitation', () => {

        cy.request({
            method: 'post',
            url: '/api/convites',
            body: {
                name: invitation.name,
                status: invitation.status
            }
        }).then(res => {
            cy.log(res.body)
        })
    })
})