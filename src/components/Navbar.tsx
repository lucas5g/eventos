import Link from 'next/link'
import jwtDecode from 'jwt-decode'

import { useEffect, useState } from 'react'
import { NavLink } from './NavLink'


interface User {
    name: string
    profile: string

}

export function Navbar() {

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

        <nav className="navbar navbar-dark navbar-expand-lg navbar-light purple-gradient fw-bold fixed-top">
            <div className="container">
                <Link href='/'>
                    <a className="navbar-brand">
                        Eventos
                    </a>
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-mdb-toggle="collapse"
                    data-mdb-target="#navbarButtonsExample"
                    aria-controls="navbarButtonsExample"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <i className="fas fa-bars"></i>
                </button>

                <div className="collapse navbar-collapse" id="navbarButtonsExample">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
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
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link active dropdown-toggle"
                                    href="#"
                                    id="navbarDropdownMenuLink"
                                    role="button"
                                    data-mdb-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    {user.name}
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <li>
                                        <a className="dropdown-item" href="/sair">Sair</a>
                                    </li>

                                </ul>
                            </li>
                        }
                    </ul>

                </div>
            </div>
        </nav>
    )
}




    // return (
    //     <>
    //         <Navbar bg="dark" variant='dark' className='purple-gradient' expand="lg"   >
    //             <Container >
    //                 <Link href={'/'}>
    //                     <Navbar.Brand href='/' >
    //                         Eventos
    //                         </Navbar.Brand>
    //                 </Link>
    //                 <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    //                 <Navbar.Collapse id="responsive-navbar-nav">
    //                     <Nav className="ms-auto">
    //                         {user.name &&
    //                             <>
    //                                 <NavLink href='/convidados'>
    //                                     Convidadados
    //                                 </NavLink>
    //                                 <NavLink href='/relatorio'>
    //                                     Relatório
    //                                 </NavLink>
    //                             </>
    //                         }
    //                         {(user.profile === 'Admin' || user.profile === 'Gerente') &&
    //                             <NavLink href='/usuarios'>
    //                                 Usuários
    //                             </NavLink>
    //                         }
    //                         {!user.name &&
    //                             <NavLink href='/login'>
    //                                 Login
    //                             </NavLink>
    //                         }
    //                         {user.name &&
    //                             <NavDropdown title={user.name} id="collasible-nav-dropdown" >

    //                                 <NavDropdown.Item href="/sair">
    //                                     Sair
    //                                 </NavDropdown.Item>
    //                             </NavDropdown>
    //                         }

    //                     </Nav>
    //                 </Navbar.Collapse>
    //             </Container>
    //         </Navbar>
    //     </>

    // )


