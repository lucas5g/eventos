///<reference types="cypress" />

describe('Crud users', () => {

    const user = {
            name: 'admin',
            email: 'admintestcy@mail.com',
            password: 'qweqwe',
            profileId: 1,
            id: 113,
            unityId: 1

        }
        // let token
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkxVQ0FTIERFIFNPVVNBIEFTU1VOw4fDg08iLCJlbWFpbCI6Imx1Y2FzZGVzb3VzYTE5QGhvdG1haWwuY29tIiwicHJvZmlsZUlkIjoxLCJwcm9maWxlIjoiQWRtaW4iLCJpYXQiOjE2NTE1NDYyMjAsImV4cCI6MTY1MTU3NTAyMH0.zSc0Oyd7CjPMhqTZN1BfGgkSWP9KtFZeySZ3tcVvblY'


    it('Login get token', () => {
        cy.login().then(res => {
            token = res
        })
    })

    it('Retrieve users', () => {

        cy.request({
            method: 'get',
            url: '/api/usuarios',
            headers: {
                Authorization: token
            }
        }).then(res => {
            cy.log(res.body)

            expect(res.body.length).greaterThan(2)
        })

    })


    it('Create users', () => {

        cy.request({
            method: 'post',
            url: '/api/usuarios',
            body: {
                email: user.email,
                // email: `mail${new Date().getTime()}`,
                password: user.password,
                name: user.name,
                profileId: user.profileId,
                unityId: user.unityId
            },
            headers: {
                Authorization: token
            }
        }).then(res => {
            const { body } = res
            // expect(duration).exist
            expect(body).to.have.all.keys('id', 'name', 'email', 'profileId', 'unityId', 'createdAt', 'updatedAt')
            expect(body.id).exist
            user.id = body.id
            cy.log(body)

            // expect(body).not.property('password')

        })

    })

    it('Show user', () => {

        cy.request({
            method: 'get',
            url: `/api/usuarios/${user.id}`,
            headers: {
                Authorization: token
            }

        }).then(res => {
            cy.log(res.body)
            expect(res.body).property('email', user.email)

        })
    })


    it('Update user', () => {

        cy.request({
            method: 'put',
            url: `/api/usuarios/${user.id}`,
            body: {
                name: `${user.name}-update`,
                email: user.email,
                profileId: user.profileId,
                unityId: user.unityId
            },
            headers: {
                Authorization: token
            }
        }).then(res => {
            cy.log(res.body)
            expect(res.body.password).not.exist
            expect(res.body.name).equal(`${user.name}-update`)
        })
    })

    it('Update user password', () => {
        cy.request({
            method: 'put',
            url: `/api/usuarios/${user.id}`,
            body: {
                name: `${user.name}-update`,
                email: user.email,
                profileId: user.profileId,
                password: 'newsenha',
                unityId: user.unityId
            },
            headers: {
                Authorization: token
            }
        }).then(res => {
            cy.log(res.body)
            expect(res.body.password).not.exist
            expect(res.body.name).equal(`${user.name}-update`)

            /**
             * Test login new password
             */
            cy.request({
                method: 'post',
                url: '/api/auth/login',
                body: {
                    email: user.email,
                    password: 'newsenha'
                }
            }).then(res => {
                // cy.log(res)
                expect(res.body.token).exist

            })

        })

        cy.login
    })

    it('Delete user', () => {
        cy.request({
            method: 'delete',
            url: `/api/usuarios/${user.id}`,
            headers: {
                Authorization: token
            }
        }).then(res => {
            cy.log(res.body)
        })
    })
})