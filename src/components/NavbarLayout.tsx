import Link from 'next/link'
import jwtDecode from 'jwt-decode'
import { Container, Nav, Navbar, NavDropdown, Offcanvas } from 'react-bootstrap'

import { useEffect, useState } from 'react'
import { NavLink } from './NavLink'


interface User {
    name: string
    profile: string

}

export function NavbarLayout() {

    const [user, setUser] = useState<User>({
        name: '', profile: ''
    })


    useEffect(() => {

        if (localStorage.getItem('events-token')) {
            const token = localStorage.getItem('events-token')
            setUser(jwtDecode(token || ''))
        }
    }, [])


    return (
        <>
            <Navbar bg="blank" className='purple-gradient' expand="lg"   >
                <Container >
                    <Link href={'/'}>
                        <Navbar.Brand href='/'>Eventos</Navbar.Brand>
                    </Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ms-auto">
                            {user.name &&
                                <>
                                    <NavLink href='/convidados'>
                                        Convidadados
                                    </NavLink>
                                    <NavLink href='/relatorio'>
                                        Relatório
                                    </NavLink>
                                </>
                            }
                            {(user.profile === 'Admin' || user.profile === 'Gerente') &&
                                <NavLink href='/usuarios'>
                                    Usuários
                                </NavLink>
                            }
                            {!user.name &&
                                <NavLink href='/login'>
                                    Login
                                </NavLink>
                            }
                            {user.name &&
                                <NavDropdown title={user.name} id="collasible-nav-dropdown">

                                    <NavDropdown.Item href="/sair">
                                        Sair
                                    </NavDropdown.Item>
                                </NavDropdown>
                            }

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>

    )


}