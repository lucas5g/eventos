///<reference types="cypress" />

describe('Crud users', () => {

    const user = {
            name: 'admin',
            email: `${new Date()}@mail.com`,
            password: 'qweqwe',
            profile: 'Admin',
            unity: 'BH',
            id: 113,

        }
        // let token
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6InNlZWQ0MyIsImVtYWlsIjoic2VlZEBtYWlsLmNvbSIsInByb2ZpbGUiOiJBZG1pbiIsInVuaXR5IjoiQ29udGFnZW0iLCJpYXQiOjE2NTIxNTYyMjEsImV4cCI6MTY1MjE4NTAyMX0.dNG5t85oCaYi0uLqPnfKL3zJhM4-xitPGPpGD2lkkpE'


    it('Login get token', () => {
        cy.login().then(res => {
            token = res
        })
    })

    it('Retrieve users', () => {

        cy.request({
            method: 'get',
            url: '/api/usuarios',
            qs: {
                search: ''
            },
            headers: {
                Authorization: token
            }
        }).then(res => {
            cy.log(res.body)

            expect(res.body.length).greaterThan(1)
        })

    })


    it('Create users', () => {

        cy.request({
            method: 'post',
            url: '/api/usuarios',
            body: {
                email: user.email,
                password: user.password,
                name: user.name,
                profile: user.profile,
                unity: user.unity
            },
            headers: {
                Authorization: token
            }
        }).then(res => {
            const { body } = res
            // expect(duration).exist
            expect(body).to.have.all.keys('id', 'name', 'email', 'profile', 'unity')
            expect(body.id).exist
            user.id = body.id
            cy.log(body)

            // expect(body).not.property('password')

        })

    })

    it('Show user', () => {

        cy.request({
            method: 'get',
            url: `/api/usuarios/${user.id}
                    `,
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
                profile: user.profile,
                unity: user.unity
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
                password: 'newsenha',
                profile: user.profile,
                unity: user.unity
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
            expect(res.body.msg).equal('User deleted')
        })
    })
})