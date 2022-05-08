///<reference types="cypress" />

/**
 * Students return group by parents
 */

describe('Tests Guests', () => {

    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkxVQ0FTIERFIFNPVVNBIEFTU1VOw4fDg08iLCJlbWFpbCI6Imx1Y2FzZGVzb3VzYTE5QGhvdG1haWwuY29tIiwicHJvZmlsZUlkIjoxLCJwcm9maWxlIjoiQWRtaW4iLCJpYXQiOjE2NTExOTk2NzUsImV4cCI6MTY1MTIyODQ3NX0.CnhyJx0_TGrfCekgmr6rCmNquRoNvSctEhE_8NlSBEI"


    it('Login Get token', () => {
        cy.login().then(res => token = res)
    })

    it('Get Guests', () => {

        cy.request({
            method: 'get',
            url: '/api/convidados',
            qs: {
                search: ''
            },
            headers: {
                Authorization: token
            }

        }).then(res => {
            const { body } = res
            cy.log(body)
            cy.log(body[4])

            expect(body.length).lessThan(16)
            expect(body[4].students.length).lessThan(3)

        })
    })

})